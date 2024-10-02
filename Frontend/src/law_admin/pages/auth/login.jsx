import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, CssBaseline, Link, Alert, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();

  const userNameRef = useRef('');
  const passwordRef = useRef('');

  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event,
    reason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleSubmit = async(event) => {
    event.preventDefault();
    
    const response = await axios.post('http://127.0.0.1:5000/api/login', {
      username: userNameRef.current,
      password: passwordRef.current
    });
    const data = response.data;
    
    if(data.success){
      sessionStorage.setItem("user_logged_in", true);
      navigate('/admin');
    }else{
      setOpen(true);
    }

  };

  useEffect(() => {
    const userIsLoggedIn = sessionStorage.getItem("user_logged_in") ?? false
    if(userIsLoggedIn){
      navigate('/admin');
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        bgcolor='lightblue'
        autoHideDuration={3000}
        onClose={handleClose}
        message="Username or password is incorrect"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={(e) => userNameRef.current = e.target.value}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => passwordRef.current = e.target.value}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
         
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
