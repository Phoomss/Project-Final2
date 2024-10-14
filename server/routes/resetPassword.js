const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  // ตรวจสอบค่าที่รับมาจาก URL และ body
  console.log("ID from URL:", id);
  console.log("Token from URL:", token);
  console.log("Password from body:", password);

  try {
    console.log("Received token:", token);

    // ตรวจสอบ token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Invalid token:", err.message);
      return res
        .status(400)
        .json({ Status: "Error", Message: "Invalid token" });
    }
    console.log("Decoded token:", decoded);

    // ค้นหาผู้ใช้ตาม ID
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found for ID:", id);
      return res
        .status(404)
        .json({ Status: "Error", Message: "User not found" });
    }

    // แฮชรหัสผ่านและอัปเดตผู้ใช้
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ Status: "Success", Message: "Password updated successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(400)
      .json({ Status: "Error", Message: "Invalid token or user ID" });
  }
});

module.exports = router;

// เพิ่มโค้ดทดสอบ JWT ที่นี่
const testToken = jwt.sign(
  { userId: "66a0d89f4ee74c78f492432e" }, // ใช้ userId จริง
  "Jungkook1997", // ใช้ค่า JWT_SECRET จริง
  { expiresIn: "1d" }
);

console.log("Test Token:", testToken);
