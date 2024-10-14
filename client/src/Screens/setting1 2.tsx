import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "../misc/setting1.css";
import Navbar2 from "../Navbar/Navbar1";

function Setting() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleCancelChangePassword = () => {
    setShowChangePassword(false);
  };

  const handleToggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const handleCancelDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSubmitPasswordConfirmation = () => {
    // ตรวจสอบรหัสผ่านที่ผู้ใช้ป้อนที่นี่
    // หากรหัสผ่านถูกต้องให้เรียกใช้ handleDeleteAccount()
    // ถ้าไม่ใช่ ให้แสดงข้อความผิดพลาดหรือทำอย่างอื่นตามที่คุณต้องการ
  };

  const handleDeleteAccount = () => {
    // ทำการลบบัญชีผู้ใช้งานที่นี่
  };

  return (
    <div>
      <Navbar2 />
      <header className="header" role="banner">
        <div className="nav-wrap">
          <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
              <li id="sidebarSet">
                <a href="/setting1">จัดการบัญชีผู้ใช้</a>
              </li>
              <li id="sidebarSet">
                <a href="/setting2">การแจ้งเตือน</a>
              </li>
              <li id="sidebarSet">
                <a href="/setting3">ความปลอดภัยและการเข้าสู่ระบบ</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Container className="contain-setting">
        <div className="manageAcc">
          <h4>จัดการบัญชีผู้ใช้</h4>
          <div className="form-outline mb-4">
            <label className="form-label">อีเมล</label>
            <p>ดึงอีเมล</p>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label">รหัสผ่าน</label>
            <p>ดึงรหัสผ่านมาแบบไม่แสดง</p>
            <button
              className="btnChangpass"
              onClick={handleToggleChangePassword}
            >
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
          <div className="deleteAcc">
            <h4>ลบบัญชีผู้ใช้</h4>
            <p>ลบบัญชีของคุณและข้อมูลบัญชีของคุณ</p>
            <button
              className="btnDeleteAcc"
              onClick={handleToggleDeleteConfirmation}
            >
              ลบบัญชีผู้ใช้
            </button>
          </div>
        </div>
      </Container>
      {showChangePassword && (
        <div className="change-password-modal">
          <h4>เปลี่ยนรหัสผ่าน</h4>
          <div>
            <input type="password" placeholder="รหัสผ่านเดิม" />
            <input type="password" placeholder="รหัสผ่านใหม่" />
            <input type="password" placeholder="ยืนยันรหัสผ่านใหม่" />
            <div className="button-container">
              <button className="newpassmodal">ยืนยัน</button>
              <button
                onClick={handleCancelChangePassword}
                className="confirmnewpassmodal"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <h4>ยืนยันการลบบัญชีผู้ใช้</h4>
          <p>คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีของคุณและข้อมูลบัญชีของคุณ?</p>
          <div className="button-container">
            <div>
              <input
                type="password"
                placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              
            <button
              className="confirm-delete"
              onClick={handleSubmitPasswordConfirmation}
            >
              ยืนยัน
            </button>

            <button
              className="cancel-delete"
              onClick={handleCancelDeleteConfirmation}
            >
              ยกเลิก
            </button>

            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting;
