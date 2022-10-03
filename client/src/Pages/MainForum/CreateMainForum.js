import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/main/create";

const CreateMainForum = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(null);
    let errors = 0;

    if (!title) {
      setTitleError("Title is Require!");
      errors++;
    }
    if (errors) return;

    const data = { title };
    const response = await axios.post(API_URL, data);
    const { id } = response.data;
    navigate("/main/" + id);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px 20% 0px 20%" }}>
      <h1>Create Main Forum</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Main Forum
        </Button>
      </Box>
    </div>
  );
};

export default CreateMainForum;
