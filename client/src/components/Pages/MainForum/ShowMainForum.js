import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Button, Divider, CardActions } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container } from '@mui/system'
import { useSelector } from 'react-redux'
import { API_GET_MAIN, API_MAIN } from '../../../services/main.service'

function ShowMainForum() {
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const { user: currentUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [mains, setMains] = useState([])

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
      setShowSuperAdminBoard(currentUser.roles.includes('ROLE_SUPER_ADMIN'))
    } else {
      setShowAdminBoard(false)
      setShowSuperAdminBoard(false)
    }
    getMains()
  }, [currentUser])

  const getMains = async () => {
    const response = await axios.get(API_MAIN)
    setMains(response.data)
  }

  const deleteMainForum = async (mainId) => {
    try {
      await axios.delete(API_GET_MAIN + mainId)
      getMains()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <div style={{ padding: '2rem' }}>
        <h1 className="text-center">Main Forum</h1>
        {showSuperAdminBoard || showAdminBoard ? (
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, background: '#816aff' }}
              color="primary"
              onClick={() => navigate('/main/create')}
            >
              Create Main Forum
            </Button>
          </div>
        ) : null}
        <Divider style={{ margin: '2rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: '2rem', flexWrap: 'wrap' }}>
          {mains.map((main, index) => (
            <>
              <Card sx={{ maxWidth: 345, marginBottom: '20px', background: 'var(--card-bg)' }}>
                <CardMedia key={index} component="img" alt="green iguana" height="240" image={main.url} />
                <CardContent sx={{ textAlign: 'center' }} onClick={() => navigate(`/main/${main.id}`)}>
                  <Typography gutterBottom variant="h5" component="div">
                    {main.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {main.description}
                  </Typography>
                </CardContent>
                {showSuperAdminBoard || showAdminBoard ? (
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <IconButton onClick={() => navigate(`/main/edit/${main.id}`)}>
                      <i class="ri-edit-box-fill"></i>
                    </IconButton>
                    <IconButton onClick={() => deleteMainForum(main.id)}>
                      <i class="ri-delete-bin-6-fill"></i>
                    </IconButton>
                  </CardActions>
                ) : null}
              </Card>
            </>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default ShowMainForum
