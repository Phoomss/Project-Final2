import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "../misc/setting1.css";
import Navbar2 from "../Navbar/Navbar1";
import { changePassword, deleteUserProfile } from "../api/profile";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Screens/sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const getUserFromLocalStorage = (): any => {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const userData = JSON.parse(userString);
      if (userData && userData._id && userData.email) {
        return userData;
      } else {
        console.error("Invalid user data structure in localStorage.");
        return {}; // คืนค่าอ็อบเจ็กต์ว่างเมื่อข้อมูลไม่ตรงตามโครงสร้างที่คาดหวัง
      }
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      return {}; // คืนค่าอ็อบเจ็กต์ว่างเมื่อมีข้อผิดพลาดในการแปลง JSON
    }
  }
  return {}; // คืนค่าอ็อบเจ็กต์ว่างเมื่อไม่มีข้อมูลใน localStorage
};

const user = getUserFromLocalStorage();

function Setting() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const navigate = useNavigate();

  const handleCloseChangePasswordModal = () =>
    setShowChangePasswordModal(false);
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);

  const handleCloseDeleteAccountModal = () => setShowDeleteAccountModal(false);
  const handleShowDeleteAccountModal = () => setShowDeleteAccountModal(true);

  const handleChangePassword = async () => {
    if (password1 !== password2) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      await changePassword({ _id: user._id, password: password1 });
      alert("เปลี่ยนรหัสผ่านสำเร็จ");
      navigate(`/home`);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้ของคุณและข้อมูลบัญชีของคุณ?"
      )
    ) {
      try {
        await deleteUserProfile(user._id);
        alert("ลบบัญชีสำเร็จ");
        navigate(`/home`);
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("เกิดข้อผิดพลาดในการลบบัญชี");
      }
    }
  };

  return (
    <div>
      <Navbar2 />
      <Sidebar />

      <Container className="contain-setting">
        <div className="manageAcc">
          <h4>จัดการบัญชีผู้ใช้</h4>
          <div className="form-outline mb-4">
            <label className="form-label">อีเมล</label>
            <input
              type="email"
              id="set1-input1"
              className="form-control"
              value={user.email || ""}
              disabled
            />
          </div>

          <Button
            style={{ backgroundColor: "#433e49", border: "none" }}
            onClick={handleShowChangePasswordModal}
          >
            เปลี่ยนรหัสผ่าน
          </Button>
          <Modal
            show={showChangePasswordModal}
            onHide={handleCloseChangePasswordModal}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>เปลี่ยนรหัสผ่าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-outline mb-4">
                <label className="form-label">รหัสผ่านใหม่</label>
                <input
                  type="password"
                  id="password1"
                  className="form-control"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  style={{ width: "350px" }}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">ยืนยันรหัสผ่านใหม่</label>
                <input
                  type="password"
                  id="password2"
                  className="form-control"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  style={{ width: "350px" }}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseChangePasswordModal}
              >
                ปิด
              </Button>
              <Button
                style={{ backgroundColor: "#433e49", border: "none" }}
                onClick={handleChangePassword}
              >
                ยืนยัน
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="deleteAcc">
            <h4>ลบบัญชีผู้ใช้</h4>
            <p>ลบบัญชีของคุณและข้อมูลบัญชีของคุณ</p>

            <Button variant="danger" onClick={handleShowDeleteAccountModal}>
              ลบบัญชีผู้ใช้
            </Button>

            <Modal
              show={showDeleteAccountModal}
              onHide={handleCloseDeleteAccountModal}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>ลบบัญชีผู้ใช้</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้ของคุณและข้อมูลบัญชีของคุณ
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseDeleteAccountModal}
                >
                  ยกเลิก
                </Button>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  ลบบัญชี
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Setting;
