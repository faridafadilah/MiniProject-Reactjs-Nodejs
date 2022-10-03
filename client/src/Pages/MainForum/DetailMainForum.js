import React, { useState, useEffect } from "react";
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";

const API_Main = "http://localhost:8080/api/main/";
const API_Sub = "http://localhost:8080/api/sub?mainforumId=";

function DetailMainForum() {
  const user = AuthService.getCurrentUser();
  const showAdminBoard = user.roles.includes("ROLE_ADMIN");
  const showSuperAdminBoard = user.roles.includes("ROLE_SUPER_ADMIN");
  const navigate = useNavigate();
  const { id } = useParams();
  const [main, setMain] = useState(null);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getMain();
    getSub([]);
  }, [id]);

  const getMain = async () => {
    const response = await axios.get(API_Main + id);
    setMain(response.data);
  };

  const getSub = async () => {
    const response = await axios.get(API_Sub + id);
    setSubs(response.data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/main">Back</Link>
      {main && <h1>{main.title}</h1>}

      {showAdminBoard || showSuperAdminBoard && (
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/sub/create/${id}`)}
      >
        Create Sub Forum
      </Button>
      )}

      <Divider style={{ margin: "2rem 0" }} />

      <List>
        {subs.map((sub, index) => (
          <ListItem
            button
            onClick={() => navigate(`/sub/${sub.id}`)}
            key={index}
          >
            <ListItemText primary={sub.judul} secondary={sub.createdAt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DetailMainForum;
