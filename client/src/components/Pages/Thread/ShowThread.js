import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, List } from '@mui/material'
import Box from '@mui/material/Box'
import axios from 'axios'
import { Container } from '@mui/system'
import { useSelector } from 'react-redux'
import userService from '../../../services/user.service'
import './Thread.css'
import ImageDefault from '../../../assets/img/User.png'
import { API_CREATE_POST, API_THREAD, API_GET_POST, API_POST } from '../../../services/main.service'

function DetailThread() {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [users, setUsers] = useState([])
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [thread, setThread] = useState(null)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  console.log(users)
  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.id)
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
      setShowSuperAdminBoard(currentUser.roles.includes('ROLE_SUPER_ADMIN'))
    } else {
      setShowAdminBoard(false)
      setShowSuperAdminBoard(false)
    }
    getThread()
    getPosts()
  }, [])

  const getUser = (userId) => {
    userService
      .getUserAllById(userId)
      .then((response) => {
        setUsers(response.data)
        console.log('Isi Data User:', response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getThread = async () => {
    const response = await axios.get(API_THREAD + id)
    setThread(response.data)
  }

  const getPosts = async () => {
    const response = await axios.get(API_GET_POST + id, {
      params: {
        page,
      },
    })
    if (response.data.length) {
      setPosts(response.data)
      setPage(page + 1)
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }

  const handleReply = async (event) => {
    event.preventDefault()
    if (!replyContent) return
    const data = {
      userId: currentUser.id,
      nameUser: currentUser.username,
      threadId: thread.id,
      content: replyContent,
      imageUser: users.url,
    }
    const response = await axios.post(API_CREATE_POST, data)
    setPosts([...posts, response.data])
    setReplyContent('')
  }

  const deletePost = async (postId) => {
    try {
      await axios.delete(API_POST + postId)
      getPosts()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => navigate(`/sub/${id}`)}>
          <i class="ri-arrow-left-circle-line"></i>
        </Button>
        {thread && (
          <>
            <h1>{thread.title}</h1>
            <p>
              <i className="ri-user-line"></i>
              {thread.userName}
              {'  '} <i className="ri-time-line"></i>
              {thread.createdAt}
            </p>
            <img src={thread.url ? thread.url : ' '} alt="Preview Image" style={{ width: '196px' }} />
            <p>{thread.content}</p>
          </>
        )}

        <div className="ui comments">
          <List>
            {posts.map((post, index) => (
              <div className="comment" key={index} style={{ padding: '0px 31px' }}>
                <a className="avatar">
                  <img
                    src={post.imageUser === null ? ImageDefault : post.imageUser}
                    alt="post img"
                    style={{ width: '50px' }}
                  />
                </a>
                <div className="content" style={{ marginBottom: '20px' }}>
                  <span className="author">{post.nameUser}</span>
                  <div className="metadata">
                    <div className="date">{post.createdAt}</div>
                  </div>
                  <div className="text">
                    {post.content}
                    <Button onClick={() => deletePost(post.id)}>
                      <i className="ri-delete-bin-6-line"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </List>
        </div>

        {showSuperAdminBoard || showAdminBoard ? (
          <>
            <Button variant="contained" sx={{ mr: 2 }} disabled={!hasMore} onClick={getPosts}>
              Load More Post
            </Button>
            <Button variant="contained" sx={{ background: '#816aff' }} onClick={() => setIsReplying(true)}>
              <i className="ri-reply-line"></i> Reply
            </Button>
          </>
        ) : (
          ''
        )}

        {isReplying && (
          <Box component="form" onSubmit={handleReply} noValidate sx={{ mt: 1 }}>
            <textarea
              required
              label="Content"
              name="content"
              style={{ width: '100%', height: '100px', marginTop: '10px' }}
              value={replyContent || ''}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <Button type="submit" variant="contained" sx={{ mt: 1, background: '#816aff' }}>
              Kirim Komentar
            </Button>
          </Box>
        )}
      </div>
    </Container>
  )
}

export default DetailThread
