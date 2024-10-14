import { Card, Badge, Dropdown, Button, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { LuHeart } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import "../misc/feeds.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Post } from "../types/post";
import { deletePostById } from "../api/post";

const PostCard = ({ feed }: { feed: Post }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  const handleClickCard = (id: string) => {
    navigate(`/content/${id}`);
  };

  const handleDelete = async () => {
    if (postIdToDelete) {
      await deletePostById(postIdToDelete);
      setShowModal(false);
      navigate(0); // รีเฟรชหน้าเว็บหลังจากการลบ
    }
  };

  const handleShowModal = (id: string) => {
    setPostIdToDelete(id);
    setShowModal(true);
  };

  return (
    <>
      <Card style={{ width: "100%", position: "relative" }}>
        <Card.Img
          variant="top"
          src={feed.image}
          style={{ objectFit: "cover", height: "200px" }} // ตั้งค่าขนาดของรูปและการปรับเนื้อหา
        />
        <TfiMoreAlt
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "25px",
            cursor: "pointer",
          }}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        <Card.Body onClick={() => handleClickCard(feed._id)}>
          <Card.Title style={{ fontWeight: "bold" }} className="text-truncate">
            {feed.topic}
          </Card.Title>
          <div style={{ marginBottom: "10px" }}>
            {feed.category.includes("คาเฟ่") && <Badge bg="info">คาเฟ่</Badge>}
            {feed.category.includes("ร้านอาหาร") && (
              <Badge bg="primary">ร้านอาหาร</Badge>
            )}
            {feed.category.includes("ท่องเที่ยว") && (
              <Badge bg="warning">ท่องเที่ยว</Badge>
            )}
            {feed.category.includes("บิวตี้") && (
              <Badge bg="light">บิวตี้</Badge>
            )}
            {feed.category.includes("ข่าวสาร") && (
              <Badge bg="danger">ข่าวสาร</Badge>
            )}
            {feed.category.includes("อื่นๆ") && (
              <Badge bg="secondary">อื่นๆ</Badge>
            )}
          </div>

          <Card.Subtitle
            className="mb-2 text-muted b"
            style={{
              display: "flex",
            }}
          >
            <div style={{ fontWeight: "bold", marginRight: "7px" }}>
              {feed.user.fullname}
            </div>
            <div style={{ color: "grey" }}>
              {dayjs(feed.createdAt).format("DD/MM/YYYY")}
            </div>
          </Card.Subtitle>

          <Card.Text className="text-truncate">
            {feed.contentWithImages.map((cwi) => cwi.content).join("\n")}
          </Card.Text>
          {/* Like */}
          <div className="btn-action">
            <div className="icon-like">
              <LuHeart />
            </div>
            <p className="likecount">{feed.likes.length}</p>
            <div className="icon-cm">
              <FaRegComment />
            </div>
            {/* <p className="commentcount">{feed.comments.length}</p> */}

            <div className="save">
              <div className="icon-save">
                <MdOutlineBookmarkBorder />
              </div>
            </div>
          </div>
        </Card.Body>

        {showDropdown && (
          <Dropdown
            style={{
              position: "absolute",
              top: "50px",
              right: "180px",
            }}
            show={showDropdown}
          >
            <Dropdown.Menu variant="dark">
              <Dropdown.Item
                onClick={() => {
                  setShowDropdown(false);
                  navigate(`/editpost/${feed._id}`);
                }}
              >
                แก้ไขโพสต์
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleShowModal(feed._id)}>
                ลบโพสต์
              </Dropdown.Item>
              <Dropdown.Item>ตั้งค่าความเป็นส่วนตัว</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการลบโพสต์</Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            ลบโพสต์
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostCard;
