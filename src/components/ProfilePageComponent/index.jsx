import React from 'react'
import MainPageHeader from '../../ui/Headers/MainPageHeader'
import { Box, Button, Container, Typography } from '@mui/material'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function ProfilePageComponent() {
    const user = JSON.parse(Cookies.get("user"));
    const navigate = useNavigate();


    const SignOut = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        navigate("/account/login");
    }
    return (
        <>
            <MainPageHeader />
            <Container>
                <Box sx={{marginTop:"25px"}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb:"15px" }}>
                        <Typography sx={{ fontSize: "32px" ,fontWeight:"800"}}>Профіль</Typography>
                        <Button variant="contained" onClick={SignOut} sx={{ backgroundColor:"#000","&:hover":{backgroundColor: "rgba(43,48,59,0.8)"} }}>Вийти</Button>
                    </Box>
                    <Box >
                        <Typography sx={{ fontSize: "22px" }}>
                            <b>Пошта:</b> {user.email}
                        </Typography>
                        <Typography sx={{ fontSize: "22px" }}>
                            <b>Телефон:</b> {user.phone}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>

    )
}
