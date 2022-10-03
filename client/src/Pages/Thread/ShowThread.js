import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, List } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import AuthService from "../../services/auth.service";

const API_Thread = "http://localhost:8080/api/thread/";
const API_Post_Create = "http://localhost:8080/api/post/create";
const API_Post = "http://localhost:8080/api/post?threadId=";

function DetailThread() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = AuthService.getCurrentUser();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getThread();
    getPosts();
  }, []);

  const getThread = async () => {
    const response = await axios.get(API_Thread + id);
    setThread(response.data);
  };

  const getPosts = async () => {
    const response = await axios.get(API_Post + id, {
      params: {
        page,
      },
    });
    if (response.data.length) {
      setPosts(response.data);
      setPage(page + 1);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const handleReply = async (event) => {
    event.preventDefault();
    if (!replyContent) return;
    const data = {
      userId: currentUser.id,
      nameUser: currentUser.username,
      threadId: thread.id,
      content: replyContent,
      imageUser: currentUser.image
    };
    const response = await axios.post(API_Post_Create, data);
    setPosts([...posts, response.data]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => navigate(`/sub/${id}`)}>Back</Button>
      {thread && <h1>{thread.title}</h1>}
      {thread && <p>{thread.content}</p>}

      <div className="ui comments">
        <List>
          {posts.map((post, index) => (
            <div
              className="comment"
              key={index}
              style={{ padding: "0px 31px" }}
            >
              <div className="content" style={{ marginBottom: "20px" }}>
                <span className="author">{post.nameUser}</span>
                <div className="metadata">
                  <div className="date">{post.createdAt}</div>
                </div>
                <div className="text">{post.content}</div>
              </div>
            </div>
          ))}
        </List>
      </div>

      <Button
        variant="contained"
        color="primary"
        disabled={!hasMore}
        onClick={getPosts}
      >
        Load More Post
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsReplying(true)}
      >
        Reply
      </Button>
      {isReplying && (
        <Box component="form" onSubmit={handleReply} noValidate sx={{ mt: 1 }}>
          <textarea
            required
            label="Content"
            name="content"
            style={{ width: "100%", height: "100px", marginTop: "10px" }}
            value={replyContent || ""}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Reply
          </Button>
        </Box>
      )}
    </div>
  );
}

export default DetailThread;
