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
import Cookies from 'js-cookie';

//import Turnstile from "react-turnstile";


export default function LoginPageComponent() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (login && password) {
      try {
        setIsLogin(true)
        const {data} = await axios.post("/v0/user/login", {
          login: login,
          password: password,
        });
        setIsLogin(false)
        console.log(data);
        Cookies.set('token', data.token, {
          expires: 86400,
          path: '/',
        })
        Cookies.set('user', JSON.stringify(data.user), {
          expires: 86400,
          path: '/',
        })
        setIsError(false);
        setErrorMessage("");
        navigate("/order");
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.response.data.errors[0].msg || "Сталася помилка");
        setIsLogin(false)
      }
    }
    else {
      setIsError(true);
      setErrorMessage("Не всі поля заповнені");
      setIsLogin(false)
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
              sx={{mt: 3, mb: 2 , color: '#fff', backgroundColor: "rgb(39,39,42)", "&:hover":{backgroundColor: "rgba(39,39,42,0.9)"} }}
              disabled={isLogin}

            >
              Увійти
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/account/sign-up"}>
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
