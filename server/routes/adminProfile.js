const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/admin");
const User = require("../models/user");
const Post = require("../models/blog");
const jwt = require("jsonwebtoken");

//Admin
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find({}).lean();
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// });

// Middleware ตรวจสอบสิทธิ์ของแอดมิน
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token in server", token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findById(decoded.id);

    console.log("Decoded: ", decoded);
    console.log("Admin: ", admin);

    if (admin && admin.is_admin) {
      req.user = admin;
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 1. รับข้อมูลผู้ใช้ทั้งหมด (แอดมิน)
// router.get("/users", isAdmin, async (req, res) => {
//   try {
//     const userCount = await User.countDocuments();
//     console.log("userCount", userCount); // This logs the count on the server-side
//     res.json({ count: userCount });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// waiting for add isAdmin function //
router.get("/users", async (req, res) => {
  try {
    const now = new Date();

    // for fetch data last 24 Hour
    // const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // const userCount = await User.countDocuments({
    //   createdAt: { $gte: last24Hours },
    // });

    // for fetch all
    const userCount = await User.countDocuments();

    res.json(userCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/viewer", async (req, res) => {
  try {
    const now = new Date();

    // for fetch data last 24 Hour
    // const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // const posts = await Post.find({ createdAt: { $gte: last24Hours } });

    // for fetch all
    const posts = await Post.find();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// waiting for add isAdmin function //

// 2. รับข้อมูลผู้ใช้ตาม ID (แอดมิน)
router.get("/users/:id", isAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 3. อัปเดตข้อมูลผู้ใช้ (แอดมิน)
router.put("/users/:id", isAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // ตรวจสอบค่าที่อัปเดต
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 4. ลบบัญชีผู้ใช้ (แอดมิน)
router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error.message); // เพิ่มข้อความแสดงข้อผิดพลาด
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const admin = await Admin.findById(req.params.id).lean();
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email, password });

//     if (admin) {
//       res.json({ success: true, id: admin._id, message: "Login successful!" });
//     } else {
//       res.json({ success: false, message: "Invalid email or password." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (admin) {
      // สร้าง token
      const adminToken = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        success: true,
        id: admin._id,
        token: adminToken,
        message: "Login successful!",
      });
    } else {
      res.json({ success: false, message: "Invalid email or password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
