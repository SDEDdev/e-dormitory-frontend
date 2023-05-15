import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

import ViewOrderPageComponent from '../../components/ViewOrderPageComponent';
import { Container } from '@mui/material';
import MainPageHeader from '../../ui/Headers/MainPageHeader';



export default function OrderViewPage() {
  const navigate = useNavigate();
  const token = Cookies.get("token")
  axios.defaults.headers.common['Authorization'] = token;
  useEffect(() => {
    if (!token) {
      navigate("/account/login");
    }
  }, [])

  return (
    <>
      {token ?
        <>
        <MainPageHeader />
          <Container>
            <ViewOrderPageComponent />
          </Container>
        </>
        :
        <div>Ви не авторизовані</div>}
    </>
  )
}
