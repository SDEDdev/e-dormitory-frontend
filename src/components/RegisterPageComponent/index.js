import React, { useRef, useState } from 'react'
// Router
import { Link } from 'react-router-dom';
// 
import MainPageHeader from '../../ui/Headers/MainPageHeader';
// MUI
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
// 
import Turnstile from "react-turnstile";


export default function RegisterPageComponent() {
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")

    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    // Captcha
    const [openCaptcha, setOpenCaptcha] = useState(false);
    const [token, setToken] = useState("");

    const verifyCaptcha = () => {
        setOpenCaptcha(true)
    }

    const handleSubmit = async (event) => {
        //event.preventDefault();
        setToken(event)
        console.log(event);
        //const data = new FormData(event.currentTarget);


        if (phone && email && password) {
            if (confPassword === password) {
                try {
                    console.log({
                        phone:phone,
                        email: email,
                        password: password,
                        token: token,
                    });
                    await axios.post("http://10.160.12.50:3000/user/register", {
                        phone:phone,
                        email: email,
                        password: password,
                        token: token,
                    });
                    setIsError(false);
                    setErrorMessage("");
                    setToken("");
                    setOpenCaptcha(false);
                } catch (error) {
                    setToken("");
                    setIsError(true);
                    setErrorMessage(error.response.data.errors[0].msg || "Сталася помилка");
                    setOpenCaptcha(false);
                }
            }
            else {
                setOpenCaptcha(false);
                setIsError(true);
                setErrorMessage("Паролі не співпадають");
            }
        }
        else {
            setOpenCaptcha(false);
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
                        Вхід
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
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </Grid>
                            {/* Mobile phone */}
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Телефон"
                                    name="phone"
                                    autoComplete="family-name"
                                    value={phone}
                                    onChange={e=>setPhone(e.target.value)}
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
                                    onChange={e=>setPassword(e.target.value)}
                                />
                            </Grid>
                            {/* Password confirm */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="conf-password"
                                    label="Підтвердіть пароль"
                                    type="password"
                                    id="conf-password"
                                    autoComplete="confirm-password"
                                    value={confPassword}
                                    onChange={e=>setConfPassword(e.target.value)}
                                />
                            </Grid>
                            {/* Captcha confirm */}

                            {openCaptcha &&
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Turnstile
                                        sitekey="0x4AAAAAAADq3Kne7N9r1x9f"
                                        onVerify={(token) => handleSubmit(token)}
                                        onError={error=>setOpenCaptcha(false)}
                                    />

                                </Grid>}


                            {isError && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert> </Grid>}

                        </Grid>
                        <Button
                            //type="submit"
                            onClick={verifyCaptcha}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            
                        >
                            Увійти
                        </Button>
                        {/* <Button
                            type="submit"
                            //onClick={verifyCaptcha}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!openCaptcha}
                        >
                            Увійти
                        </Button> */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={"/account/login"}>
                                    Вже маєте акаунт? Увійдіть.
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
