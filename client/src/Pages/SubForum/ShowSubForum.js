import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const API_Sub = "http://localhost:8080/api/sub/";
const API_Thread = "http://localhost:8080/api/thread?subforumId=";

function ShowSubForum() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sub, setSub] = useState(null);
  const [thread, setThread] = useState([]);

  useEffect(() => {
    getSub();
    getThread();
  }, []);

  const getSub = async () => {
    const response = await axios.get(API_Sub + id);
    setSub(response.data);
  };

  const getThread = async () => {
    const response = await axios.get(API_Thread + id);
    setThread(response.data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => navigate(`/main/${id}`)}>Back</Button>
      {sub && <h1>{sub.judul}</h1>}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/thread/create/${id}`)}
      >
        Create Thread
      </Button>

      <List>
        {thread.map((thread, index) => (
          <ListItem
            button
            onClick={() => navigate(`/thread/${thread.id}`)}
            key={index}
          >
            <ListItemText primary={thread.title} secondary={thread.createdAt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ShowSubForum;
