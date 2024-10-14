import { Container } from "react-bootstrap";
import "../misc/setting1.css";
import "../misc/setting2.css";
import "../misc/setting3.css";
import { FaFacebookSquare } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import Navbar2 from "../Navbar/Navbar1";

function Setting2() {
  return (
    <div>
      <div>
        <Navbar2 />
      </div>

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
          <h4>ความปลอดภัยและการเข้าสู่ระบบ</h4>
          <div>
            <p id="topicOfset3">การยืนยันตัวตน</p>
            <div className="setNiti">
              <p id="qthelp1">
                <RiGitRepositoryPrivateFill />
                ต้องใช้รหัสผ่านเพื่อเข้าสู่ระบบทุกครั้ง{" "}
                <label className="switch1">
                  <input type="checkbox" /> <div></div>
                </label>
              </p>
            </div>

            <p id="topicOfset3">ตัวเลือกการเข้าสู่ระบบ</p>
            <div>
              <p id="qthelp2">
                <FaFacebookSquare />
                เข้าสู่ระบบผ่านบัญชี Facebook การแจ้งเตือนผ่านอีเมล
                <label className="switch2">
                  <input type="checkbox" /> <div></div>
                </label>{" "}
              </p>
            </div>
            <div>
              <p id="qthelp3">
                <FaGoogle />
                เข้าสู่ระบบผ่านบัญชี Google{" "}
                <label className="switch4">
                  <input type="checkbox" /> <div></div>
                </label>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Setting2;
