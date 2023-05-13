import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
import DateSettingsDPageComponent from '../../../components/DashboardPageComponent/DateSettingsDPageComponents';
import axios from 'axios';

export default function DateSettingsPage() {
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
        {token ? <DateSettingsDPageComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
