import React, { useEffect } from 'react'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'
//Page component
import CreateOrderPageComponent from '../../components/CreateOrderPageComponent';
import axios from 'axios';




export default function CreateOrderPage() {
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
        {token ? <CreateOrderPageComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
