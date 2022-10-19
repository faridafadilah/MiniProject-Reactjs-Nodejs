import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { API_SUB } from '../../../services/main.service'

const EditSubForum = () => {
  const navigate = useNavigate()
  const [judul, setJudul] = useState('')
  const [judulError, setJudulError] = useState(null)
  const [file, setFile] = useState('')
  const [fileError, setFileError] = useState(null)
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState(null)
  const [preview, setPreview] = useState('')
  const { id } = useParams()

  useEffect(() => {
    getSubId()
  }, [])

  const getSubId = async () => {
    const response = await axios.get(API_SUB + id)
    setJudul(response.data.judul)
    setDescription(response.data.description)
    setFile(response.data.image)
    setPreview(response.data.url)
  }

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const updateSub = async (e) => {
    e.preventDefault()
    setJudulError(null)
    setDescriptionError(null)
    let errors = 0

    if (!judul) {
      setJudulError('Title is Require!')
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
    formData.append('mainforumId', id)
    formData.append('judul', judul)
    formData.append('description', description)
    try {
      await axios.patch(API_SUB + id, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      navigate('/main/' + id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px 20% 0px 20%' }}>
      <Box component="form" onSubmit={updateSub} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          label="Judul"
          name="judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          error={!!judulError}
          helperText={judulError}
        />
        <TextField
          sx={{ mt: 3 }}
          required
          fullWidth
          label="Description"
          name="description"
          value={description}
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
          Update
        </Button>
      </Box>
    </div>
  )
}

export default EditSubForum