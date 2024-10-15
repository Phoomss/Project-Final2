const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt"); // เพิ่ม bcrypt
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password, firstname, lastname, tel } = req.body;

  try {
    // ตรวจสอบว่า username หรือ email มีอยู่แล้วหรือไม่
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Username or email already taken" });
    }

    // แฮชรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword, // ใช้รหัสผ่านที่แฮชแล้ว
      firstname,
      lastname,
      tel,
    });
    await newAdmin.save();

    // Successful registration
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
