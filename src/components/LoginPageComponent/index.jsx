import React, { useRef, useState } from 'react'
// Router
import { Link, useNavigate } from 'react-router-dom';
// 
import MainPageHeader from '../../ui/Headers/MainPageHeader/index.jsx';
// MUI
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
// 
import nookies from 'nookies'
//import Turnstile from "react-turnstile";


export default function LoginPageComponent() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (login && password) {
      try {
        const {data} = await axios.post("https://e-dormitory.sded.cf/v0/user/login", {
          login: login,
          password: password,
        });
        console.log(data);
        nookies.set(null, 'token', data.token, {
          maxAge: 86400,
          path: '/',
        })
        nookies.set(null, 'user', JSON.stringify(data.user), {
          maxAge: 86400,
          path: '/',
        })
        setIsError(false);
        setErrorMessage("");
        navigate("/profile");
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.response.data.errors[0].msg || "Сталася помилка");
      }
    }
    else {
      setIsError(true);
      setErrorMessage("Не всі поля заповнені");
    }

  };


  return (
    <>
      <MainPageHeader />
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
            Реєстрація
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Пошта"
                  name="email"
                  autoComplete="email"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </Grid>
              {/* Password*/}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              {isError && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert> </Grid>}
            </Grid>
            <Button
              //type="submit"
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Увійти
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/account/login"}>
                  Ще не маєте акаунту? Зареєструйтеся.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
