import React from 'react'
// My components
import MainPageHeader from '../../ui/Headers/MainPageHeader/index.jsx'
// My ui components
import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


export default function MainPageComponent() {
  return (
    <>
      <MainPageHeader typePage={"main"} />
      <Box sx={{
        background: "center url(/images/home-bg-black.png)",
        padding: "50px 0",
        height: "calc(100vh - 64px)"
      }}>
        <Container>
          <Typography sx={{ color: "#ff9100", fontSize: "22px", textAlign: "center" }}>
            Ласкаво просимо на сайт <br /> електронного поселення в гуртожиток
          </Typography>
          <Typography component={"h1"} sx={{ mt:"35px",color: "#fff", fontSize: {xs:"27px", sm:"48px"},fontWeight:"800", textAlign: "center",textShadow: "0 4px 4px rgba(0, 0, 0, 0.22)" }}>
          За допомогою Є-поселення, студенти можуть подати заявку на поселення в гуртожиток онлайн
          </Typography>
          <Box sx={{display:"flex", justifyContent:"center" , mt:"25px"}}>
          <Button sx={{backgroundColor:"#fff", color:"#000","&:hover":{backgroundColor: "rgba(255,255,255,0.5)"}, fontSize:"15px", fontWeight:"800", padding:"8px 22px"}}>
              <Link to={"/order"}>
              Поселитися
              </Link>
          </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}
