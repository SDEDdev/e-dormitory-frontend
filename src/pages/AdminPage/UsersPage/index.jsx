import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
import UsersDashboardComponent from '../../../components/DashboardPageComponent/UsersDPageComponent';






export default function UsersPage() {
    const navigate = useNavigate();
    const  token  = Cookies.get("token")
    useEffect(() => {
      if(!token){
        navigate("/account/login");
      }
    }, [])
    
  return (
    <>
        {token ? <UsersDashboardComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
