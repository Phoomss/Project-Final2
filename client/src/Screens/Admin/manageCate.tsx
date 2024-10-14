import React from "react";
import { PiUsersThreeFill } from "react-icons/pi";
import { LuView } from "react-icons/lu";
import { fetchAdminProfile } from "../../api/adminProfile";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const ManageCate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const genderData = {
    male: 30,
    female: 20,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const profileData = await fetchAdminProfile(id);
          setUsername(profileData.username);
          setAdminProfile(profileData);
          setEmail(profileData.email);
          setTel(profileData.tel);
          setFirstname(profileData.firstname);
          setLastname(profileData.lastname);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="manageUser">
      <div className="main1">
        <h1>จัดการบัญชีผู้ใช้</h1>

        <div className="add-q">
          <div>
            <IoMdAdd />
            <a href="#" style={{ width: "150px" }}>
              เพิ่มหมวดหมู่
            </a>
          </div>
        </div>

        <div className="insights">
          <div className="user-all">
            <MdCategory className="svg1" />
            <div className="middle">
              <div className="left">
                <h3>หมวดหมู่ทั้งหมด</h3>
                <h1>8</h1>
              </div>
            </div>
            <small className="text-muted1">Last 24 Hour</small>
          </div>
        </div>

        <div className="recent-order" style={{ marginTop: "1.5rem" }}>
          <h2>รายการ</h2>
          <div className="right">
            <div
              className="activity-analytics"
              style={{
                marginTop: "0.5rem",
                overflowY: "scroll",
                maxHeight: "300px",
              }}
            >
              <div className="item ">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/21/16/94/2116949d8173512c55db395903781fd7.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>food</h3>
                    <small className="text-muted1">อาหาร</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item ">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/cf/84/b9/cf84b94a757bbb9124cd4646d8069433.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>cafe</h3>
                    <small className="text-muted1">คาเฟ่</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/ab/d9/3d/abd93dc5a998f8f6ecd7148df7fa6a36.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>lifestyle</h3>
                    <small className="text-muted1">การใช้ชีวิต</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/48/33/76/483376371b3e03301a5d9a6c15013342.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>travel</h3>
                    <small className="text-muted1">ท่องเที่ยว</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/9f/68/55/9f685516e86bd4fe54a30d181bcdc6e1.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>fashion</h3>
                    <small className="text-muted1">การแต่งตัว</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/9f/68/55/9f685516e86bd4fe54a30d181bcdc6e1.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>beauty</h3>
                    <small className="text-muted1">การแต่งหน้า</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/9f/68/55/9f685516e86bd4fe54a30d181bcdc6e1.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>news</h3>
                    <small className="text-muted1">ข่าวสาร</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/9f/68/55/9f685516e86bd4fe54a30d181bcdc6e1.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>other</h3>
                    <small className="text-muted1">อื่นๆ</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCate;
