import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

import ViewOrderPageComponent from '../../components/ViewOrderPageComponent';



export default function OrderViewPage() {
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
        {token ? <ViewOrderPageComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
