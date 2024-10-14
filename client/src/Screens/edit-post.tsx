import React, { useEffect, useState } from "react";
import "../misc/wp.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { editPost, getPostById } from "../api/post";
import "../misc/register.css";
import { useParams } from "react-router-dom";
import { Post, ContentWithImages } from "../types/post";
import { Dropdown } from "react-bootstrap";

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<string>("");
  const [contentWithImages, setContentWithImages] = useState<
    ContentWithImages[]
  >([]);
  const [image, setImage] = useState<string | null>(null); // ใช้ image แทน mainImage
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };

  useEffect(() => {
    async function fetchData() {
      const post: Post = await getPostById(id as string);
      if (post) {
        setTopic(post.topic);
        setContentWithImages(post.contentWithImages);
        setSelectedCategories(post.category);
        setImage(post.image); // เปลี่ยนจาก mainImage เป็น image
      }
    }
    fetchData();
  }, [id]);

  const handleContentChange = (index: number, newContent: string) => {
    setContentWithImages((prevContentWithImages) =>
      prevContentWithImages.map((cwi, i) =>
        i === index ? { ...cwi, content: newContent } : cwi
      )
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleContentImagesChange = (index: number, newImages: string[]) => {
    setContentWithImages((prevContentWithImages) =>
      prevContentWithImages.map((cwi, i) =>
        i === index ? { ...cwi, images: newImages } : cwi
      )
    );
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const fileReaders = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("File reading failed"));
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders)
        .then((images) => {
          handleContentImagesChange(index, [
            ...contentWithImages[index].images,
            ...images,
          ]);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
          alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        });
    }
  };

  const handlePost = async () => {
    if (!topic || !selectedCategories.length || !contentWithImages.length) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("ไม่พบข้อมูลผู้ใช้ใน localStorage");
      }

      const post = {
        topic,
        category: selectedCategories,
        contentWithImages,
        user: userId,
        image, // ส่ง image ด้วย
      };

      await editPost(id as string, post);

      alert("แก้ไขโพสต์สำเร็จ!");
      setTopic("");
      setContentWithImages([]);
      setSelectedCategories([]);
      setImage(null); // รีเซ็ตค่า image หลังจากส่งโพสต์
      window.location.href = "/";
    } catch (error) {
      console.error("Post failed:", error);
      alert("เกิดข้อผิดพลาดในการโพสต์บล็อก");
    }
  };

  const handleRemoveImage = (index: number, imageIndex: number) => {
    setContentWithImages((prevContentWithImages) =>
      prevContentWithImages.map((cwi, i) =>
        i === index
          ? {
              ...cwi,
              images: cwi.images.filter((_, idx) => idx !== imageIndex),
            }
          : cwi
      )
    );
  };

  return (
    <div className="write-post-container">
      <div className="wp">
        <Row>
          <Col>
            <Form.Label htmlFor="inputTopic">หัวข้อ</Form.Label>
            <Form.Control
              type="text"
              id="inputTopic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={50}
            />
          </Col>
          <Col>
            <div className="alltype">
              <Form.Label htmlFor="inputCategory">หมวดหมู่</Form.Label>
              <div className="all-type">
                <Dropdown show={isOpen} onToggle={toggleDropdown}>
                  <Dropdown.Toggle id="dropdown-basic" onClick={toggleDropdown}>
                    {selectedCategories.length > 0
                      ? `Selected ${selectedCategories.length}`
                      : "Select Options"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {[
                      "วิชาเสรี",
                      "ข่าวสาร/ประชาสัมพันธ์",
                      "น้องใหม่",
                      "ลงทะเบียนเรียน",
                      "กีฬา",
                      "ทั่วไป",
                      "รีวิวมข",
                    ].map((category) => (
                      <Dropdown.Item key={category}>
                        <Form.Check
                          type="checkbox"
                          value={category}
                          label={category}
                          checked={selectedCategories.includes(category)}
                          onChange={handleCheckboxChange}
                        />
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <div>
                  <ul
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    {selectedCategories.map((value) => (
                      <li
                        key={value}
                        className={`category-chip category-${value.replace(
                          /[/\s]/g,
                          ""
                        )}`}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p>หมวดหมู่ที่เลือก: {selectedCategories.join(", ")}</p>
            </div>
          </Col>
        </Row>
        <Form.Group controlId="formMainImage" className="mb-3">
          <Form.Label>รูปภาพหลัก</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange} // เปลี่ยนชื่อฟังก์ชันให้ตรง
          />
          {image && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={image}
                alt="Main Image"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          )}
        </Form.Group>

        <Row>
          <Col>
            {contentWithImages.map((cwi, index) => (
              <div key={index}>
                <Form.Group className="mb-3">
                  <Form.Label>เนื้อหา</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={cwi.content}
                    onChange={(e) => handleContentChange(index, e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId={`formFile${index}`} className="mb-3">
                  <Form.Label>เพิ่มรูปภาพ</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleFileChange(
                        e as React.ChangeEvent<HTMLInputElement>,
                        index
                      )
                    }
                  />
                </Form.Group>

                <div className="add-pic-2">
                  {cwi.images.map((pic, picIndex) => (
                    <div key={picIndex} className="pic">
                      <img src={pic} alt={`Pic ${picIndex}`} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, picIndex)} // ส่ง index และ picIndex
                        className="delete-pic"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Col>
        </Row>

        <div
          className="btnallwp"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button className="post" onClick={handlePost}>
            แก้ไขโพสต์
          </button>
          <a href="/" style={{ textDecoration: "none" }}>
            <button className="cancel">Cancel</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
