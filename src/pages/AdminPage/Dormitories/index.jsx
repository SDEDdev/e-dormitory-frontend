import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
import DormitoriesDashboardComponent from '../../../components/DashboardPageComponent/DormitoriesDPageComponent';
import axios from 'axios';






export default function DormitoriesPage() {
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
        {token ? <DormitoriesDashboardComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
