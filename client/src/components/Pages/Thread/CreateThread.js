import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserService from '../../../services/user.service'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { API_CREATE_THREAD } from '../../../services/main.service'
import FormErrors from '../../FormError/FormError'

const CreateThread = () => {
  const { subforumId } = useParams()
  const { user: currentUser } = useSelector((state) => state.auth)
  const [users, setUsers] = useState([])
  console.log('isi user saja', currentUser)
  console.log('Image', users.url)
  const [title, setTitle] = useState('')
  const [errors, setErrors] = useState([]);
  const [titleError, setTitleError] = useState(null)
  const [file, setFile] = useState('')
  const [fileError, setFileError] = useState(null)
  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState(null)
  const [preview, setPreview] = useState('')
  const navigate = useNavigate()

  const getUser = (userId) => {
    UserService.getUserAllById(userId)
      .then((response) => {
        setUsers(response.data)
        console.log('Isi Data User:', response.data)
      })
      .catch((e) => {
        console.log(e)
        setErrors([e.response.data.message]);
      })
  }

  useEffect(() => {
    getUser(currentUser.id)
  }, [])

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setTitleError(null)
    setContentError(null)
    let errors = 0

    if (!title) {
      setTitleError('Title is Require!')
      errors++
    }
    if (!content) {
      setContentError('Content is Require!')
      errors++
    }
    if (!file) {
      setFileError('Image Require!')
      errors++
    }
    if (errors) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('content', content)
    formData.append('userId', currentUser.id)
    formData.append('userName', currentUser.username)
    formData.append('userImage', users.url)
    formData.append('subforumId', subforumId)
    try {
      const response = await axios.post(API_CREATE_THREAD, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      const { id } = response.data
      navigate('/thread/' + id)
    } catch (error) {
      console.log(error)
      setErrors([error.response.data.msg]);
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px 20% 0px 20%' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {!!errors.length && <FormErrors errors={errors} />}
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          label="Content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          error={!!contentError}
          helperText={contentError}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          name="image"
          type="file"
          onChange={loadImage}
          error={!!fileError}
          helperText={fileError}
        />
        {preview ? (
          <figure className="image is-128x128">
            <img src={preview} alt="Preview Image" style={{ width: '196px' }} />
          </figure>
        ) : (
          ''
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save
        </Button>
      </Box>
    </div>
  )
}

export default CreateThread
