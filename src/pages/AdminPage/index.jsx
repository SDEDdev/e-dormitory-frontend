import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardPageComponent from './../../components/DashboardPageComponent/index';


export default function AdminPage() {
  const navigate = useNavigate();
  const token = Cookies.get("token")
  useEffect(() => {
    if (!token) {
      navigate("/account/login");
    }
  }, [])
  return (
   <DashboardPageComponent /> 
  )
}
