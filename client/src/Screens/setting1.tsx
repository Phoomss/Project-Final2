import React, { useState } from 'react';
import { TextField, Button, Tabs, Tab, Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Settings() {
  const [value, setValue] = useState(0);
  const [bio, setBio] = useState(`Senior blog writer at Hamill Group since 2017.\nI've also been lucky enough to work for the Parisian LLC.`);
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

  return (
    <div style={{ padding: '20px 15%', maxWidth: '1500px', margin: 'auto' }}>
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

      {/* Profile Picture Upload Section */}
      <Box display="flex" alignItems="center" marginBottom="20px">
        <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" style={{ width: 80, height: 80 }} />
        <div style={{ marginLeft: '20px' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Upload New</Button>
          <Button variant="outlined" color="secondary">Remove Profile Picture</Button>
        </div>
      </Box>

      {/* Form Fields for Account Settings */}
      <form noValidate autoComplete="off">
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            defaultValue="Christine Brown"
          />
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            defaultValue="christinebrown@gmail.com"
            
          />
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            defaultValue="christinebrown"
          />
          <TextField
            fullWidth
            label="Phone number"
            variant="outlined"
            defaultValue="+1 945-913-2196"
           
          />
        </div>

        <TextField
          fullWidth
          label="Bio"
          variant="outlined"
          multiline
          rows={4}
          value={bio}
          onChange={handleBioChange}
          inputProps={{ maxLength: 120 }} // Set maximum length for bio
          style={{ marginBottom: '20px' }}
        />
        <Typography variant="caption" color="textSecondary">
          {bioLength}/120 characters
        </Typography>

        <Button variant="contained" color="primary" fullWidth>
          Update Profile
        </Button>
      </form>
    </div>
  );
}
