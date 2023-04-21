import React from 'react'
// My components
import MainPageHeader from '../../ui/Headers/MainPageHeader/index.jsx'
// My ui components
import { Container, Typography } from '@mui/material'


export default function MainPageComponent() {
  return (
    <>
      <MainPageHeader/>
      <Container >
          <Typography sx={{textAlign:"center", fontSize:"64px"}}>
            Вас вітає є-поселення
          </Typography>
      </Container>
    </>
  )
}
