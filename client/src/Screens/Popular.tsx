import React, { useEffect, useState, useCallback } from "react";
import {
  getPosts,
  deletePostById,
  savePost,
  likePost,
  deleteSave,
} from "../api/post";
import { Post } from "../types/post";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dropdown,
  Modal,
  Spinner,
  ToggleButton,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { TfiMoreAlt } from "react-icons/tfi";
import "../misc/feeds.css";
import { GoHeartFill } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi2";

const Category = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Post[]>([]);
  const [sortedFeeds, setSortedFeeds] = useState<Post[]>([]);
  const [radioValue, setRadioValue] = useState("1");
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClickselectPost = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userId = localStorage.getItem("userId");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      setFeeds(res);
    } catch (e) {
      console.error("Failed to fetch posts:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const savedPosts = feeds.map((feed) => {
      const isSaved = localStorage.getItem(`saved_${feed._id}`) === "true";
      return { ...feed, isSaved };
    });

    setSortedFeeds(savedPosts);
  }, [feeds]);

  useEffect(() => {
    const sorted = [...feeds];
    if (radioValue === "1") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (radioValue === "2") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (radioValue === "3") {
      sorted.sort((a, b) => b.likes.length - a.likes.length);
    }

    // อัปเดต isSaved ใน sortedFeeds ก่อนตั้งค่า
    const updatedSortedFeeds = sorted.map((feed) => {
      const isSaved = localStorage.getItem(`saved_${feed._id}`) === "true";
      return { ...feed, isSaved };
    });

    setSortedFeeds(updatedSortedFeeds);
  }, [feeds, radioValue]);

  const handleClickCard = (id: string) => {
    navigate(`/content/${id}`);
  };

  const handleShowModal = (id: string) => {
    setPostIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (postIdToDelete) {
      try {
        await deletePostById(postIdToDelete);
        setFeeds((prevFeeds) =>
          prevFeeds.filter((feed) => feed._id !== postIdToDelete)
        );
      } catch (e) {
        console.error(e);
      } finally {
        setShowModal(false);
      }
    }
  };

  const handleSavePost = async (id: string) => {
    if (!userId) {
      console.error("User ID is null");
      return;
    }

    try {
      const post = feeds.find((feed) => feed._id === id);
      if (!post) {
        console.error("Post not found");
        return;
      }

      const isSaved = post.saves.some((save: any) => save.user === userId);

      // ทำการบันทึกหรือลบโพสต์ตามสถานะการบันทึก
      if (isSaved) {
        await deleteSave(id);
        localStorage.removeItem(`saved_${id}`);
      } else {
        await savePost(id);
        localStorage.setItem(`saved_${id}`, "true");
      }

      // อัปเดต state ของ feeds
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed._id === id
            ? {
                ...feed,
                saves: isSaved
                  ? feed.saves.filter((save: any) => save.user !== userId) // ลบการบันทึก
                  : [...feed.saves, { user: userId } as any], // เพิ่มการบันทึก
                isSaved: !isSaved, // สลับสถานะ isSaved
              }
            : feed
        )
      );
    } catch (e) {
      console.error("Failed to save or unsave post:", e);
    }
  };

  const handleLike = async (id: string): Promise<void> => {
    try {
      await likePost(id as string);
      fetchPosts();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "วิชาเสรี":
        return "category-วิชาเสรี";
      case "ข่าวสาร/ประชาสัมพันธ์":
        return "category-ข่าวสารประชาสัมพันธ์";
      case "น้องใหม่":
        return "category-น้องใหม่";
      case "ลงทะเบียนเรียน":
        return "category-ลงทะเบียนเรียน";
      case "กีฬา":
        return "category-กีฬา";
      case "ทั่วไป":
        return "category-ทั่วไป";
      case "รีวิวมข":
        return "category-รีวิวมข";
      default:
        return "";
    }
  };

  const handleClickPost = () => {
    navigate(`/posts`);
  };

  return (
    <div className="blogs">
      <section className="trending-post" id="trending">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" style={{ color: "#cb6ce6" }} />
          </div>
        ) : (
          <div className="blog">
            {sortedFeeds.map((feed, idx) => (
              <div className="row" key={idx} style={{ position: "relative" }}>
                <div className="select-detail">
                  <TfiMoreAlt
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown((prev) =>
                        prev === feed._id ? null : feed._id
                      );
                    }}
                  />
                  {showDropdown === feed._id && (
                    <Dropdown
                      show={showDropdown === feed._id}
                      style={{
                        position: "absolute",
                        right: "200px",
                        top: "20px",
                      }}
                    >
                      <Dropdown.Menu variant="dark">
                        {userId === feed.user._id && (
                          <>
                            <Dropdown.Item
                              onClick={() => navigate(`/editpost/${feed._id}`)}
                            >
                              แก้ไขโพสต์
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleShowModal(feed._id)}
                            >
                              ลบโพสต์
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Item>ตั้งค่าความเป็นส่วนตัว</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
                <div className="row2" onClick={() => handleClickCard(feed._id)}>
                  <img src={feed.image} alt="" />
                  <div className="user-name d-flex align-items-center justify-content-between mt-2">
                    <div className="user-feed d-flex align-items-center">
                      <img
                        src={`${feed.user.profile_picture}`}
                        alt=""
                        style={{ margin: "0.5rem 0.5rem 0.5rem 0 " }}
                      />
                      <h6 style={{ fontSize: "16px" }}>{feed.user.username}</h6>
                    </div>
                    <div className="stat-icon">
                      <IoStatsChart style={{ fontSize: "16px" }} />
                    </div>
                  </div>
                  <div className="detail-blog">
                    <h4>{feed.topic}</h4>
                    <div style={{ marginBottom: "10px" }}>
                      {feed.category.map((category) => (
                        <span
                          key={category}
                          className={`category ${getCategoryBadgeClass(
                            category
                          )}`}
                          style={{ marginRight: "5px" }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <p>
                      {feed.contentWithImages
                        .map((cwi) => cwi.content)
                        .join("\n")}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      <Badge bg="light" text="dark">
                        <GoHeartFill
                          style={{ marginRight: "5px", fontSize: "16px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(feed._id);
                          }}
                          color={
                            feed.likes.find((l) => l.user === userId)
                              ? "red"
                              : "black"
                          }
                        />
                        {feed.likes.length}
                      </Badge>

                      <Badge bg="light" text="dark">
                        <IoBookmark
                          style={{
                            marginRight: "5px",
                            fontSize: "16px",
                            color: feed.isSaved ? "#cb6ce6" : "black",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSavePost(feed._id);
                          }}
                        />
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
      </section>
    </div>
  );
};

export default Category;
