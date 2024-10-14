import { useState, useEffect, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import logohead from "../../pic/logo-headV2.png";
import { loginAdmin } from "../../api/adminlogin-Regist"; // นำเข้า loginAdmin
import "../../misc/login.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const toggleBtns = document.querySelectorAll<HTMLAnchorElement>(".toggle");
    const mainElement = document.querySelector<HTMLElement>("main");
    const bulletElements =
      document.querySelectorAll<HTMLElement>(".bullets span");

    const handleFocus = (inp: HTMLInputElement) => {
      inp.classList.add("active");
    };

    const handleBlur = (inp: HTMLInputElement) => {
      if (inp.value === "") {
        inp.classList.remove("active");
      }
    };

    const handleToggleClick = () => {
      mainElement?.classList.toggle("sign-up-mode");
    };

    const moveSlider = (event: Event) => {
      const index = (event.currentTarget as HTMLElement).dataset.value;
      const currentImage = document.querySelector<HTMLImageElement>(
        `.img-${index}`
      );
      const textSlider = document.querySelector<HTMLElement>(".text-group");

      if (currentImage && textSlider) {
        bulletElements.forEach((bull) => bull.classList.remove("active"));
        (event.currentTarget as HTMLElement).classList.add("active");

        const allImages = document.querySelectorAll<HTMLImageElement>(".image");
        allImages.forEach((img) => img.classList.remove("show"));

        currentImage.classList.add("show");
        textSlider.style.transform = `translateY(${
          -(parseInt(index || "1", 10) - 1) * 2.2
        }rem)`;
      }
    };

    toggleBtns.forEach((btn) =>
      btn.addEventListener("click", handleToggleClick)
    );
    bulletElements.forEach((bullet) =>
      bullet.addEventListener("click", moveSlider)
    );

    const inputs = document.querySelectorAll<HTMLInputElement>(".input-field");
    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => handleFocus(inp));
      inp.addEventListener("blur", () => handleBlur(inp));
    });

    return () => {
      toggleBtns.forEach((btn) =>
        btn.removeEventListener("click", handleToggleClick)
      );
      bulletElements.forEach((bullet) =>
        bullet.removeEventListener("click", moveSlider)
      );
      inputs.forEach((inp) => {
        inp.removeEventListener("focus", () => handleFocus(inp));
        inp.removeEventListener("blur", () => handleBlur(inp));
      });
    };
  }, []);

  const handleAlertClose = useCallback(() => {
    setAlertMessage(null);
  }, []);

  const displayAlert = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      const responseData = await loginAdmin(email, password);

      if (typeof responseData === "object" && "success" in responseData) {
        if (responseData.success) {
          if (responseData.id) {
            localStorage.setItem("adminId", responseData.id);
            setAdminId(responseData.id);
            window.location.href = `/admin/${responseData.id}`;
            displayAlert("เข้าสู่ระบบสำเร็จ");
          } else {
            console.error("Response does not contain ID:", responseData);
            displayAlert("Response does not contain ID");
          }
        } else {
          displayAlert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
      } else {
        console.error("Unexpected response:", responseData);
        displayAlert("Unexpected response format");
      }
    } catch (error: any) {
      console.error("Error:", error.message);

      if (error instanceof TypeError) {
        console.error("Network error or CORS issue");
      } else if (error instanceof SyntaxError) {
        console.error("Error parsing JSON response");
      }

      displayAlert("โปรดลองอีกครั้ง");
    }
  }, [email, password, displayAlert]);

  return (
    <div className="login-container">
      <main>
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              <form autoComplete="off" className="sign-in-form">
                <div className="logo">
                  <img src={logohead} alt="easyclass" />
                </div>

                <div className="heading">
                  <h2>ยินดีต้อนรับผู้ดูแลระบบ</h2>
                </div>

                <div className="actual-form">
                  <div className="input-wrap">
                    <input
                      type="email"
                      minLength={4}
                      className="input-field"
                      autoComplete="off"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="label-login">อีเมล</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="password"
                      minLength={4}
                      className="input-field"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="label-login">รหัสผ่าน</label>
                  </div>

                  <input
                    type="submit"
                    value="เข้าสู่ระบบ"
                    className="sign-btn"
                    onClick={handleLogin}
                  />

                  <p className="text">
                    <Link to="/forgot-password">ลืมรหัสผ่าน</Link>{" "}
                    ในการเข้าสู่ระบบ
                  </p>
                </div>
              </form>
            </div>

            <div className="carousell">
              <div className="images-wrapper">
                <img src="../" className="image img-1 show" alt="" />
                <img src="./img/image2.png" className="image img-2" alt="" />
                <img src="./img/image3.png" className="image img-3" alt="" />
              </div>

              <div className="text-slider">
                <div className="text-wrap">
                  <div className="text-group">
                    <h2>สร้างประสบการณ์ของคุณเอง</h2>
                    <h2>แลกเปลี่ยนความคิดเห็นกับผู้อื่น</h2>
                    <h2>หาความรู้กับบุคคลทั่วไป</h2>
                  </div>
                </div>

                <div className="bullets">
                  <span className="active" data-value="1"></span>
                  <span data-value="2"></span>
                  <span data-value="3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {alertMessage && (
          <div className="alert-overlay">
            <div className="alertbox">
              {alertMessage.includes("สำเร็จ") ? (
                <FaCheckCircle style={{ color: "#28a745", fontSize: "32px" }} />
              ) : (
                <IoCloseCircle style={{ color: "#dc3545", fontSize: "32px" }} />
              )}
              <p>{alertMessage}</p>
              <button className="btnClose" onClick={handleAlertClose}>
                ปิด
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
