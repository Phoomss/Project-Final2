import React, { useState } from "react";
import "../misc/wp.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { createPost } from "../api/post";
import { Dropdown } from "react-bootstrap";
import { HiOutlinePlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function Writepost() {
  const navigate = useNavigate();
  const [selectedPics, setSelectedPics] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fields, setFields] = useState<{ pics: string[]; content: string }[]>([
    { pics: [], content: "" },
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCategories((prevCategories) =>
      event.target.checked
        ? [...prevCategories, value]
        : prevCategories.filter((item) => item !== value)
    );
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePost = async () => {
    if (!topic) {
      alert("กรุณากรอกหัวข้อ");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("กรุณาเลือกหมวดหมู่");
      return;
    }
    if (!selectedImage) {
      alert("กรุณาเลือกภาพหลัก");
      return;
    }
    if (fields.some((field) => !field.content)) {
      alert("กรุณากรอกเนื้อหาในทุกช่อง");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("ไม่พบข้อมูลผู้ใช้ใน localStorage");
      }

      const post = {
        topic,
        detail,
        category: selectedCategories,
        image: selectedImage || "",
        contentWithImages: fields.map((field) => ({
          content: field.content,
          images: field.pics,
        })),
        user: userId,
      };

      await createPost(post);

      alert("โพสต์บล็อกสำเร็จ!");
      // รีเซ็ตฟอร์ม
      setSelectedImage(null);
      setTopic("");
      setDetail("");
      setContent("");
      setSelectedCategories([]);
      setSelectedPics([]);
      setFields([{ pics: [], content: "" }]);
      navigate(`/`);
    } catch (error) {
      console.error("Post failed:", error);
      alert("เกิดข้อผิดพลาดในการโพสต์บล็อก");
    }
  };

  const shortenFileName = (
    fileName: string,
    maxLength: number = 20
  ): string => {
    return fileName.length > maxLength
      ? fileName.slice(0, maxLength) + "..."
      : fileName;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log(base64String); // ตรวจสอบ Base64 string ที่ได้
        setSelectedImage(base64String); // ไม่ต้องตัด Base64 string ที่เกิน
      };

      reader.readAsDataURL(file);
    }
  };

  const shortenBase64String = (
    base64String: string,
    maxLength: number = 20
  ): string => {
    const base64Data = base64String.split(",")[1]; // แยกออกจากข้อมูลเมตา
    return base64Data.length > maxLength
      ? base64Data.slice(0, maxLength) + "..."
      : base64Data;
  };

  const handlePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const fileReaders = files.map((file) => {
        const reader = new FileReader();
        return new Promise<string | ArrayBuffer | null>((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then((results) => {
        const filteredResults = results.filter(
          (result): result is string => result !== null
        );

        setFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[fieldIndex] = {
            ...updatedFields[fieldIndex],
            pics: [...updatedFields[fieldIndex].pics, ...filteredResults],
          };
          return updatedFields;
        });

        setSelectedPics((prevPics) => [...prevPics, ...filteredResults]);
      });
    }
  };

  const handleRemovePicture = (picIndex: number, fieldIndex: number) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        pics: updatedFields[fieldIndex].pics.filter(
          (_, index) => index !== picIndex
        ),
      };
      return updatedFields;
    });
  };

  const handleAddField = () => {
    setFields((prevFields) => [...prevFields, { pics: [], content: "" }]);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    fieldIndex: number
  ) => {
    const newContent = event.target.value;
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        content: newContent,
      };
      return updatedFields;
    });
  };

  const handleClickCancel = () => {
    navigate(`/`);
  };

  const isFormValid =
    topic &&
    selectedCategories.length > 0 &&
    selectedImage &&
    fields.every((field) => field.content);

  return (
    <div className="write-post-container">
      <Form>
        <Row>
          <Col md={8}>
            <Form.Group controlId="formTopic">
              <Form.Label>หัวข้อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="หัวข้อโพสต์"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
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
          </Col>

          <Col md={12}>
            <Form.Group controlId="formDetail">
              <Form.Label>รายละเอียด</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="รายละเอียด"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMainImage">
              <Form.Label style={{ marginTop: "1rem" }}>
                เลือกรูปภาพหน้าปก
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <div className="selectfile">
                  <img src={selectedImage} alt="Selected" />
                </div>
              )}
            </Form.Group>

            {fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <Form.Group controlId={`formPictures_${fieldIndex}`}>
                  <Form.Label style={{ marginTop: "1rem" }}>รูปภาพ</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) =>
                      handlePictureChange(
                        e as React.ChangeEvent<HTMLInputElement>,
                        fieldIndex
                      )
                    }
                  />
                </Form.Group>

                <Form.Group controlId={`formContent_${fieldIndex}`}>
                  <Form.Label style={{ marginTop: "1rem" }}>เนื้อหา</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="เนื้อหา"
                    value={field.content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleContentChange(e, fieldIndex)
                    }
                  />
                </Form.Group>

                <div className="add-pic-1">
                  {field.pics.map((pic, picIndex) => (
                    <div key={picIndex} className="pic">
                      <img src={pic} alt={`Pic ${picIndex}`} />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemovePicture(picIndex, fieldIndex)
                        }
                        className="delete-pic"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddField}
              className="add-field"
            >
              <HiOutlinePlus />
              เพิ่มช่อง
            </button>

            <div className="button-post">
              <button
                type="button"
                onClick={handlePost}
                className="post-content"
                disabled={!isFormValid}
              >
                โพสต์
              </button>
              <button
                type="button"
                onClick={handleClickCancel}
                className="cancle-content"
              >
                ยกเลิก
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Writepost;
