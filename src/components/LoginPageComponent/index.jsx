import React from 'react'
import MainPageHeader from './../../../ui/Headers/MainPageHeader/index';
import { Container, Typography } from '@mui/material';

export default function LoginPageComponent() {
  return (
    <>
      <MainPageHeader/>
      <Container >
          <Typography sx={{textAlign:"center", fontSize:"64px"}}>
            Вас вітає є-поселення<br />
            йдіть нахуй!
          </Typography>
      </Container>
    </>
  )
}
