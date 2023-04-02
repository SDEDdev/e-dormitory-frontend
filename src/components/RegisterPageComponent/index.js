import React, { useState } from 'react'
// Router
import { Link } from 'react-router-dom';
// 
import MainPageHeader from '../../ui/Headers/MainPageHeader';
// MUI
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';



export default function RegisterPageComponent() {
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        if (data.get('password') && data.get('conf-password') && data.get('email')) {
            if (data.get('password') === data.get('conf-password')) {
                try {
                    console.log({
                        phone: data.get('phone'),
                        email: data.get('email'),
                        password: data.get('password'),
                    });
                    await axios.post("http://10.160.12.50:3000/user/register", {
                        phone: data.get('phone'),
                        email: data.get('email'),
                        password: data.get('password'),
                    });
                    setIsError(false);
                    setErrorMessage("");
                } catch (error) {
                 
                    setIsError(true);
                    setErrorMessage(error.response.data.errors[0].msg || "Сталася помилка");
                }
            }
            else {
                setIsError(true);
                setErrorMessage("Паролі не співпадають");
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
                        Sign up
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {isError && <Alert severity="error">{errorMessage}</Alert>}
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={"/account/login"}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
