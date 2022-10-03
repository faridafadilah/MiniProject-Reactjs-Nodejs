import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";

const API_URL = "http://localhost:8080/api/thread/create";

const CreateThread = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const { subforumId } = useParams();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(null);
    setContentError(null);
    let errors = 0;

    if (!title) {
      setTitleError("Title is required!");
    }
    if (!content) {
      setContentError("Content is required!");
    }
    if (errors) return;
    const data = { title, content, userId: currentUser.id, subforumId };
    const response = await axios.post(API_URL, data);
    const { id } = response.data;
    navigate("/thread/" + id);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px 20% 0px 20%" }}>
      <h1>Create Thread Forum</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          label="title"
          name="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
        />
        <textarea
          placeholder="Content"
          required
          style={{ width: "100%", height: "250px", marginTop: "10px" }}
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          error={!!contentError}
          helperText={contentError}
        ></textarea>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Thread Forum
        </Button>
      </Box>
    </div>
  );
};

export default CreateThread;
