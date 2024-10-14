import React from "react";
import "../misc/sidebar.css";
import { FaUserGear } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="msb" id="msb">
        <nav className="navbar navbar-default" role="navigation">
          <div className="navbar-header">
            <div className="brand-wrapper">
              <div className="brand-name-wrapper">
                <a className="navbar-brand" href="/">
                  ตั้งค่า
                </a>
              </div>
            </div>
          </div>

          <div className="side-menu-container">
            <ul className="nav navbar-nav">
              <li className="manage-acc">
                <div>
                  <a href="/setting1">
                    <FaUserGear /> จัดการบัญชีผู้ใช้
                  </a>
                </div>
              </li>
              <li className="manage-noti">
                <a href="/setting2">
                  <IoNotifications />
                  การแจ้งเตือน
                </a>
              </li>
              <li className="manage-sec ">
                <a href="/setting3">
                  <MdOutlineSecurity />
                  ความปลอดภัยและการเข้าสู่ระบบ
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
