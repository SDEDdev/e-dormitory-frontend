import MainPageHeader from '../../ui/Headers/MainPageHeader'
import { Box, Button, Container, Typography } from '@mui/material'

import { destroyCookie, parseCookies } from 'nookies'
import { useNavigate } from 'react-router-dom';

import UserContent from './UserContent';
import AdminContent from './AdminContent';


export default function ProfilePageComponent() {
    const navigate = useNavigate();
    const user = JSON.parse(parseCookies().user);
    const { token } = parseCookies();
    console.log(user);

    const SignOut = () => {
        destroyCookie(null, 'user');
        destroyCookie(null, 'token');
        navigate("/account/login");
    }

    return (
        <>
            <MainPageHeader />
            <Container >
                <Box sx ={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Typography sx={{ fontSize: "32px" }}>Ваш профіль</Typography>
                    <Button variant="contained" onClick={SignOut}>Вийти</Button>
                </Box>
                {user.roles[0] === "user" ? <UserContent token={token} /> : <AdminContent token={token}/>}
            </Container>

        </>
    )
}
