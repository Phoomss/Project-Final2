import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3001/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }), // ส่ง newPassword ด้วย
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) { // ตรวจสอบสถานะการอัปเดตพาสเวิร์ด
          navigate("/signin"); // เปลี่ยนเส้นทางไปยังหน้าสำหรับเข้าสู่ระบบ
        } else {
          // คุณสามารถจัดการกับข้อผิดพลาดที่เกิดขึ้นที่นี่ได้
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm" className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded">
        <Typography variant="h4" align="center">Forgot Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-2"
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
