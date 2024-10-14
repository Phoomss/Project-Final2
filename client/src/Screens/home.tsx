import React from "react";
import "../misc/home.css";
import Feeds from "./Feeds";
import "../misc/home.css";
import { IoIosArrowRoundForward, IoIosArrowRoundDown } from "react-icons/io";
import Footer from "../Navbar/footer";
import { Post } from "../types/post";

const somePosts: Post[] = [];

function HomePage() {
  return (
    <div className="home">
      <section className="main-home">
        <div className="main-text">
          <h5>แพลตฟอร์มแลกเปลี่ยนความคิดเห็น</h5>
          <h1>
            KKU Blogging <br /> Platform
          </h1>
          <p>Created to share opinions</p>

          <a href="#" className="main-btn">
            Start Now
            <IoIosArrowRoundForward />
          </a>
        </div>

        <div className="down-arrow">
          <a href="#trending" className="down">
            <IoIosArrowRoundDown />
          </a>
        </div>
      </section>

      <Feeds />

      <Footer />
    </div>
  );
}

export default HomePage;
