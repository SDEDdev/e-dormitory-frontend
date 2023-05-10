import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
//Page component
import BenefitDashboardComponent from '../../../components/DashboardPageComponent/BenefitsDPageComponent';
import axios from 'axios';




export default function BenefitsPage() {
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
        {token ? <BenefitDashboardComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
