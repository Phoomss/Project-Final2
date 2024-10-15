const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { id } = require("date-fns/locale");

const formDatatoSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return {
    access_token,
    profile_picture: user.profile_picture,
    username: user.username,
    fullname: user.fullname,
  };
};

// router.post("/", async (req, res) => {
//   const {
//     action,
//     username,
//     email,
//     password,
//     firstname,
//     lastname,
//     date_of_birth,
//     gender,
//     tel,
//   } = req.body;

//   try {
//     if (action === "login") {
//       const user = await User.findOne({ email });
//       if (user) {
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {
//           const token = jwt.sign(
//             { userId: user._id, email: user.email },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: "1d",
//             }
//           );
//           res.cookie("token", token);
//           res.json({
//             success: true,
//             id: user._id.toString(),
//             message: "เข้าสู่ระบบสำเร็จ",
//           });
//         } else {
//           res.json({
//             success: false,
//             message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
//           });
//         }
//       } else {
//         res.json({
//           success: false,
//           message: "ไม่พบผู้ใช้",
//         });
//       }
//     } else if (action === "register") {
//       const existingUser = await User.findOne({
//         $or: [{ username }, { email }],
//       });

//       if (existingUser) {
//         return res.json({
//           success: false,
//           message: "มีผู้ใช้อยู่แล้วโปรดเข้าสู่ระบบ",
//         });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//         firstname,
//         lastname,
//         date_of_birth,
//         gender,
//         tel,
//       });

//       await newUser.save();

//       res.json({
//         success: true,
//         id: newUser._id.toString(),
//         message: "ลงทะเบียนสำเร็จ",
//       });
//     } else {
//       res.json({ success: false, message: "Invalid action" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "เซิร์ฟเวอร์ขัดข้อง" });
//   }
// });

router.post("/", (req, res) => {
  let { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  // ลองหาว่าเป็นผู้ใช้ทั่วไปก่อน
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        // ถ้าไม่พบผู้ใช้ ลองค้นหาในแอดมิน
        Admin.findOne({ email: email })
          .then((admin) => {
            if (!admin) {
              return res.status(403).json({ error: "ไม่พบผู้ใช้หรือแอดมิน" });
            }
            // ตรวจสอบรหัสผ่านของแอดมิน
            bcrypt.compare(password, admin.password, (err, result) => {
              if (err) {
                return res
                  .status(403)
                  .json({ error: "เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองอีกครั้ง" });
              }

              if (!result) {
                return res.status(403).json({ error: "รหัสผ่านไม่ถูกต้อง" });
              } else {
                // ล็อกอินสำเร็จ (แอดมิน)
                const formData = formDatatoSend(admin);
                formData.role = "admin";
                return res.status(200).json(formData);
              }
            });
          })
          .catch((err) => {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
          });
      } else {
        // ตรวจสอบรหัสผ่านของผู้ใช้
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res
              .status(403)
              .json({ error: "เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองอีกครั้ง" });
          }

          if (!result) {
            return res.status(403).json({ error: "รหัสผ่านไม่ถูกต้อง" });
          } else {
            // ล็อกอินสำเร็จ (ผู้ใช้)
            const formData = formDatatoSend(user);
            formData.role = "user";
            return res.status(200).json(formData);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    });
});

module.exports = router;
