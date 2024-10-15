const express = require("express");
const User = require("../models/user");
const { id } = require("date-fns/locale");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "piyarat4543@gmail.com",
        pass: "wpsj ujix smjd cniw",
      },
    });

    var mailOptions = {
      from: "piyarat4543@gmail.com",
      to: user.email,
      subject: "Sending Email using Node.js",
      text: `http://localhost:3000/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

module.exports = router;
