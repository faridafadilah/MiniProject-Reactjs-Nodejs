import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";

const API_Main = "http://localhost:8080/api/main";

function ShowMainForum() {
  const user = AuthService.getCurrentUser();
  const showSuperAdminBoard = user.roles.includes("ROLE_SUPER_ADMIN");
  const navigate = useNavigate();
  const [mains, setMains] = useState([]);

  useEffect(() => {
    getMains();
  }, []);

  const getMains = async () => {
    const response = await axios.get(API_Main);
    setMains(response.data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Main Forum</h1>
      {showSuperAdminBoard && (
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/main/create")}
      >
        Create Main Forum
      </Button>
      )}
      <Divider style={{ margin: "2rem 0" }} />

      <List>
        {mains.map((main, index) => (
          <ListItem
            button
            onClick={() => navigate(`/main/${main.id}`)}
            key={index}
          >
            <ListItemText primary={main.title} secondary={main.createdAt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ShowMainForum;
