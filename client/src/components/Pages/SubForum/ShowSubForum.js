import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from '@mui/system'
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ImageDefault from '../../../assets/img/User.png'
import { API_GET_THREAD, API_SUB, API_THREAD } from '../../../services/main.service'

const ShowSubForum = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const { user: currentUser } = useSelector((state) => state.auth)
  const [sub, setSub] = useState(null)
  const [thread, setThread] = useState([])

  const getSub = async () => {
    const response = await axios.get(API_SUB + id)
    setSub(response.data)
  }

  const getThread = async () => {
    const { data } = await axios.get(API_GET_THREAD + id)
    setThread(data)
  }

  const deleteThread = async (subId) => {
    try {
      await axios.delete(API_THREAD + subId)
      getThread()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
      setShowSuperAdminBoard(currentUser.roles.includes('ROLE_SUPER_ADMIN'))
    } else {
      setShowAdminBoard(false)
      setShowSuperAdminBoard(false)
    }
    getSub()
    getThread()
  }, [id, currentUser])

  return (
    <Container>
      <div style={{ padding: '2rem' }}>
        {sub && <h1>{sub.judul}</h1>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, background: '#816aff' }}
          color="primary"
          onClick={() => navigate(`/thread/create/${id}`)}
        >
          Create Thread Forum
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: '2rem', flexWrap: 'wrap' }}>
          {!thread.length ? (
            <h1>data kosong</h1>
          ) : (
            thread.map((thread, index) => (
              <Card key={index} sx={{ maxWidth: 345, marginBottom: '20px' }}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                      <img
                        src={thread.userImage === "null" ? ImageDefault : thread.userImage}
                        alt="post img"
                        style={{ width: '50px' }}
                      />
                    </Avatar>
                  }
                  title={thread.userName}
                  subheader={thread.createdAt}
                />
                <CardMedia component="img" height="194" image={thread.url} alt="Paella dish" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {thread.content}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/thread/${thread.id}`)}>
                    <i class="ri-telegram-line"></i>
                  </IconButton>
                  {showSuperAdminBoard || showAdminBoard ? (
                    <IconButton onClick={() => deleteThread(thread.id)}>
                      <i class="ri-delete-bin-6-line"></i>
                    </IconButton>
                  ) : (
                    ''
                  )}
                </CardActions>
              </Card>
            ))
          )}
        </div>
      </div>
    </Container>
  )
}

export default ShowSubForum
