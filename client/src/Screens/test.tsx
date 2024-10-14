import "../misc/test.css";
import Form from "react-bootstrap/Form";
import { IoIosHelpCircle } from "react-icons/io";
import Navbar2 from "../Navbar/Navbar1";
// import { FcNext } from "react-icons/fc";
// import Button from "react-bootstrap/Button";

function TestPage() {
  return (
    <div className="help">
      <div className="nav-help">
        <Navbar2 />
      </div>
      <Form className="helptitle">
        <div className="HeadSch">
          <h2>ศูนย์ช่วยเหลือ</h2>
          <h2>KKU Blogging Platform</h2>
          <div className="search">
            <input
              type="text"
              placeholder="ค้นหา..."
              className="input-search"
            />
            <button className="btnsearchhelp">ค้นหา</button>
          </div>
        </div>
      </Form>
      <div className="QT">
        <p className="qtt">คำถามที่พบบ่อย</p>
        <a href="" id="qthelp1">
          <IoIosHelpCircle />
          วิธีใช้ KKU Blogging Platform
        </a>

        <a href="" id="qthelp2">
          <IoIosHelpCircle />
          วิธีการเขียนและเผยแพร่บล็อกแรกของคุณ
        </a>
        <a href="" id="qthelp3">
          <IoIosHelpCircle />
          สามารถลบบัญชีผู้ใช้ได้อย่างไร
        </a>
      </div>
    </div>
  );
}

export default TestPage;
