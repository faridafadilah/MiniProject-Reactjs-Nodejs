import React, { useState, useEffect } from 'react'
import { Button, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActions } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from '@mui/system'
import { useSelector } from 'react-redux'
import { API_GET_MAIN, API_GET_SUB, API_SUB } from '../../../services/main.service'

function DetailMainForum() {
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const { user: currentUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { id } = useParams()
  const [main, setMain] = useState(null)
  const [subs, setSubs] = useState([])

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
      setShowSuperAdminBoard(currentUser.roles.includes('ROLE_SUPER_ADMIN'))
    } else {
      setShowAdminBoard(false)
      setShowSuperAdminBoard(false)
    }
    getMain()
    getSub([])
  }, [id, currentUser])

  const getMain = async () => {
    const response = await axios.get(API_GET_MAIN + id)
    setMain(response.data)
  }

  const getSub = async () => {
    const response = await axios.get(API_GET_SUB + id)
    setSubs(response.data)
  }

  const deleteSubForum = async (mainId) => {
    try {
      await axios.delete(API_SUB + mainId)
      getSub()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <div style={{ padding: '2rem' }}>
        <Link to="/main">
          <i class="ri-arrow-left-circle-line"></i>
        </Link>
        {main && <h1>{main.title}</h1>}

        {showAdminBoard || showSuperAdminBoard ? (
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, background: '#816aff' }}
              color="primary"
              onClick={() => navigate(`/sub/create/${id}`)}
            >
              Create Sub Forum
            </Button>
          </div>
        ) : null}

        <Divider style={{ margin: '2rem 0' }} />
        <div>
          {subs.map((sub, index) => (
            <Grid item xs={12} md={6} style={{ marginBottom: '10px' }}>
              <CardActionArea component="a" key={index}>
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5" style={{ color: 'black' }}>
                      {sub.judul}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {sub.createdAt}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {sub.description}
                    </Typography>
                    <Typography variant="subtitle1" color="#816aff" onClick={() => navigate(`/sub/${sub.id}`)}>
                      Continue reading...
                    </Typography>
                    {showSuperAdminBoard || showAdminBoard ? (
                      <CardActions>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          sx={{ background: '#816aff' }}
                          onClick={() => navigate(`/sub/edit/${sub.id}`)}
                        >
                          <i class="ri-edit-line"></i>
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          sx={{ background: '#816aff' }}
                          variant="contained"
                          onClick={() => deleteSubForum(sub.id)}
                        >
                          <i class="ri-delete-bin-7-line"></i>
                        </Button>
                      </CardActions>
                    ) : (
                      ''
                    )}
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 300, display: { xs: 'none', sm: 'block' } }}
                    image={sub.url}
                    alt="Image Sub"
                  />
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default DetailMainForum