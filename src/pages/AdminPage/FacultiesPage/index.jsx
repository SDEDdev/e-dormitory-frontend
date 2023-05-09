import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
import FacultiesDashboardComponent from '../../../components/DashboardPageComponent/FacultiesDPageComponent';






export default function FacultiesPage() {
    const navigate = useNavigate();
    const  token  = Cookies.get("token")
    useEffect(() => {
      if(!token){
        navigate("/account/login");
      }
    }, [])
    
  return (
    <>
        {token ? <FacultiesDashboardComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
