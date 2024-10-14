import "../misc/test.css";
import Form from "react-bootstrap/Form";
import { IoIosHelpCircle } from "react-icons/io";
import Navbar1 from "../Navbar/Navbar";
// import { FcNext } from "react-icons/fc";
// import Button from "react-bootstrap/Button";

function hPage() {
  return (
    <div className="help">
      <div className="nav-help">
        <Navbar1 />
      </div>
      <Form className="helptitle">
        <div className="HeadSch">
          <h2>ศูนย์ช่วยเหลือ</h2>
          <h2>KKU Blogging Platform</h2>
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

export default hPage;
