import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardPageComponent from './../../components/DashboardPageComponent/index';
import axios from 'axios';


export default function AdminPage() {
  const navigate = useNavigate();
  const token = Cookies.get("token")
  axios.defaults.headers.common['Authorization'] = token;
  useEffect(() => {
    if (!token) {
      navigate("/account/login");
    }
  }, [])
  return (
   <DashboardPageComponent /> 
  )
}
