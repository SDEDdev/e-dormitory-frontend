import MainPageHeader from '../../ui/Headers/MainPageHeader'
import { Container } from '@mui/material'

import UserContent from './UserContent';
import AdminContent from './AdminContent';
import Cookies from 'js-cookie';


export default function ProfilePageComponent() {
    const user = JSON.parse(Cookies.get("user"));
    const  token  = Cookies.get("token");
    console.log(user,token);

    return (
        <>
            <MainPageHeader />
            <Container  sx={{marginTop:"20px"}}>
                
                {user.roles[0] === "user" ? <UserContent token={token} /> : <AdminContent token={token}/>}
            </Container>

        </>
    )
}
