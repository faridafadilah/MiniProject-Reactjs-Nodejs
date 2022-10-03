import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:8080/api/sub/create";

const CreateSubForum = () => {
  const navigate = useNavigate();
  const { mainforumId } = useParams();
  const [judul, setJudul] = useState("");
  const [judulError, setJudulError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJudulError(null);
    let errors = 0;

    if (!judul) {
      setJudulError("Judul is Required");
    }
    if (errors) return;

    const data = { judul, mainforumId };
    const response = await axios.post(API_URL, data);
    const { id } = response.data;
    navigate("/sub/" + id);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px 20% 0px 20%" }}>
      <h1>Create Sub Forum</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          label="Judul"
          name="judul"
          value={judul || ""}
          onChange={(e) => setJudul(e.target.value)}
          error={!!judulError}
          helperText={judulError}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Sub Forum
        </Button>
      </Box>
    </div>
  );
};

export default CreateSubForum;
