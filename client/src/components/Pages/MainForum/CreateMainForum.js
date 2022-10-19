import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormErrors from '../../FormError/FormError'
import Button from '@mui/material/Button'
import { API_CREATE_MAIN } from '../../../services/main.service'

const CreateMainForum = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(null)
  const [file, setFile] = useState('')
  const [fileError, setFileError] = useState(null)
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState(null)
  const [preview, setPreview] = useState('')
  const navigate = useNavigate()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setTitleError(null)
    setDescriptionError(null)
    let errors = 0

    if (!title) {
      setTitleError('Title is Require!')
      errors++
    }
    if (!description) {
      setDescriptionError('Description is Require!')
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
    formData.append('description', description)
    try {
      const response = await axios.post(API_CREATE_MAIN, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      const { id } = response.data
      navigate('/main/' + id)
    } catch (error) {
      console.log(error)
      setErrors([error.response.data.message]);
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
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          label="Description"
          name="description"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
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
          Create Main Forum
        </Button>
      </Box>
    </div>
  )
}

export default CreateMainForum
