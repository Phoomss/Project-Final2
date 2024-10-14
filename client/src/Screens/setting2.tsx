import React, { useState } from "react";
import {
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  TextField,
  Button,
  Tabs,
  Tab,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Setting2() {
  const [value, setValue] = useState(0);
  const [bio, setBio] = useState(
    `Senior blog writer at Hamill Group since 2017.\nI've also been lucky enough to work for the Parisian LLC.`
  );
  const [bioLength, setBioLength] = useState(bio.length);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBio = event.target.value;
    if (newBio.length <= 120) {
      setBio(newBio);
      setBioLength(newBio.length);
    }
  };
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(true); // Open confirmation dialog
  };

  const handleConfirm = () => {
    setNotificationsEnabled(!notificationsEnabled); // Toggle notifications
    setOpen(false); // Close dialog
  };

  return (
    <div style={{ padding: "20px 15%", maxWidth: "1000px", margin: "auto" }}>
      {/* Tabs for different settings sections */}
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{ marginBottom: "20px" }}
      >
        <Tab
          component={Link}
          to="/settings/edit-profile"
          label="ตั้งค่าโปรไฟล์"
        />
        <Tab component={Link} to="/login-security" label="ตั้งค่าบัญชีผู้ใช้" />{" "}
        {/* Link to another page */}
      </Tabs>

      <div>
        <p>เปลี่ยนรหัสผ่าน</p>
      </div>

      {/* Form Fields for Account Settings */}
      <form noValidate autoComplete="off">
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <TextField
            fullWidth
            label="รหัสผ่านเก่า"
            variant="outlined"
            defaultValue="กรอกรหัสผ่านเก่า"
          />
          <TextField
            fullWidth
            label="รหัสผ่านใหม่"
            variant="outlined"
            defaultValue="กรอกรหัสผ่านใหม่"
          />
        </div>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <TextField
            fullWidth
            label="ยืนยันรหัสผ่าน"
            variant="outlined"
            defaultValue="กรอกรหัสยืนยันเพื่อเปลี่ยนรหัสผ่าน"
          />
          <button
            style={{
              width: "200px",
              backgroundColor: "#6200ea",
              color: "#ffffff",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            เปลี่ยนรหัสผ่าน
          </button>
        </div>

        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="20px"
          >
            <p style={{ marginRight: "10px", marginBottom: 0 }}>
              ตั้งค่าการแจ้งเตือน
            </p>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationsEnabled}
                  onChange={handleToggle}
                  color="primary"
                />
              }
              label={
                notificationsEnabled
                  ? "การแจ้งเตือนเปิดอยู่"
                  : "การแจ้งเตือนปิดอยู่"
              }
            />
          </Box>
          {/* Confirmation Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>ยืนยันการเปลี่ยนการแจ้งเตือน</DialogTitle>
            <DialogContent>
              <DialogContentText>
                คุณต้องการ {notificationsEnabled ? "ปิด" : "เปิด"}{" "}
                การแจ้งเตือนใช่หรือไม่?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                ยกเลิก
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                ยืนยัน
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
        <button style={{color:"red"}}>ลบบัญชีผู้ใช้ถาวร</button>
          <p>เมื่อคุณกดลบบัญชีผู้ใช้ ข้อมูลบัญชีของคุณจะถูกลบทั้งหมด</p>
          
        </div>

        <Button variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </div>
  );
}
