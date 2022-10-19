import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { API_EDIT_PROFILE } from "../../services/main.service";
 
const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [hobies, setHobies] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  
 
  useEffect(() => {
    getProfileId();
  }, []);
 
  const getProfileId = async () => {
    const response = await axios.get(API_EDIT_PROFILE + currentUser.id);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setBio(response.data.bio);
    setGender(response.data.gender);
    setBirth(response.data.birth);
    setAddress(response.data.address);
    setHobies(response.data.hobies);
    setFile(response.data.image);
    setPreview(response.data.url);
  };
 
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
 
  const updateProfile = async (e) => {
    e.preventDefault();
    if(!file){
      setFile("http://localhost:8080/imageProfile/User.png");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("gender", gender);
    formData.append("birth", birth);
    formData.append("address", address);
    formData.append("hobies", hobies);
    try {
      await axios.patch(API_EDIT_PROFILE + currentUser.id, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(gender);
  if(!currentUser) {
    return <Navigate to="/login"/>;
  }
 
  return (
    <div style={{ textAlign: "center", padding: "40px 20% 0px 20%" }}>
      <Box component="form" onSubmit={updateProfile} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          readOnly
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
            required
            label="Bio"
            name="bio"
            style={{ width: "100%", height: "100px", marginTop: "10px" }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        <Select
          name="gender"
          id="demo-simple-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
        </Select>
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          name="birth"
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          label="Hobies"
          name="hobies"
          value={hobies}
          onChange={(e) => setHobies(e.target.value)}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          name="image"
          type="file"
          onChange={loadImage}
        />
        {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" style={{ width: "196px" }}/>
            </figure>
          ) : (
            ""
          )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Profile
        </Button>
      </Box>
      </div>
  );
};
 
export default EditProfile;