import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
//Page component
import OrderPageComponent from '../../components/OrderPageComponent';
import axios from 'axios';



export default function OrderPage() {
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
        {token ? <OrderPageComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
