import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import RoomSettingsDPageComponent from '../../../components/DashboardPageComponent/RoomSettingsDPageComponents';

export default function RoomSettingsPage() {
    const navigate = useNavigate();
    const  token  = Cookies.get("token")
    axios.defaults.headers.common['Authorization'] = token;
    useEffect(() => {
      if(!token){
        navigate("/account/login");
      }
    }, [])
    
  return (
    <>
        {token ? <RoomSettingsDPageComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
