import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as Yup from 'yup'

import { login } from '../../slices/auth'
import { clearMessage } from '../../slices/message'
import './LoginAndRegister.css'

const Login = () => {
  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  })

  const handleLogin = (formValue) => {
    const { username, password } = formValue
    setLoading(true)

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate('/profile')
        window.location.reload()
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const theme = createTheme()

  if (isLoggedIn) {
    return <Navigate to="/profile" />
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ background: 'black', color: 'white' }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '27%',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
              <Form className="formFields">
                <div className="formField">
                  <label className="formFieldLabel" htmlFor="username">
                    Username
                  </label>
                  <Field name="username" type="text" className="formFieldInput" placeholder="Enter your username" />
                  <ErrorMessage sx={{ m: 2 }} name="username" component="div" className="alert alert-danger" />
                </div>

                <div className="formField">
                  <label className="formFieldLabel" htmlFor="password">
                    Password
                  </label>
                  <Field name="password" type="password" className="formFieldInput" placeholder="Enter your password" />
                  <ErrorMessage sx={{ m: 2 }} name="password" component="div" className="alert alert-danger" />
                </div>

                <div className="formField">
                  <button className="formFieldButton">
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    Sign In
                  </button>
                </div>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Login
