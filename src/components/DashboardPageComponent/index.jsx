import React from 'react'
import MainPageHeader from '../../ui/Headers/MainPageHeader'
import { Box, Button, Container, Grid, Paper } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AdminRoutes = (
    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", borderRight: "solid 1px #f1f1f1f1" }}>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"users"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}
            >
                Користувачі
            </NavLink>
        </Button>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"faculties"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}>
                Факультети
            </NavLink>
        </Button>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"dormitories"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}>
                Гуртожитки
            </NavLink>
        </Button>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"benefits"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}>
                Пільги
            </NavLink>
        </Button>
    </Grid>
)
const DeanRoutes = (
    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", borderRight: "solid 1px #f1f1f1f1", }}>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"orders"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}
            >
                Список заяв
            </NavLink>
        </Button>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"date-settings"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}>
                Налаштування дати поселення
            </NavLink>
        </Button>
     
        
    </Grid>
)
const CommRoutes = (
    <Box  sx={{ display: "flex", flexDirection: "column", borderRight: "solid 1px #f1f1f1f1",minWidth:"200px",maxWidth:"200px" }}>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px" }}>
            <NavLink to={"orders"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}
            >
                Список заяв
            </NavLink>
        </Button>
        {/* --------- */}
        <Button sx={{ color: "#000", fontWeight: "600", fontSize: "18px", width:"100%" }}>
            <NavLink to={"room-settings"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}>
                Налаштування кімнат
            </NavLink>
        </Button>
     
        
    </Box>
)

export default function DashboardPageComponent() {
    const user = JSON.parse(Cookies.get("user") || null);
    return (
        <>
            <MainPageHeader />
            <Container sx={{ marginTop: "20px" }}>
                <Paper sx={{ p: "15px", minWidth:"1100px" }}>
                    <Box sx={{display:"flex"}} >
                        {user?.roles[0] === "admin"  && AdminRoutes}
                        {user?.roles[0] === "dean"  && DeanRoutes}
                        {user?.roles[0] === "commandant"  && CommRoutes}
                        <Box  sx={{ p: "15px" , minWidth:"650px", width:"100%"}}>
                            <Box sx={{ width: "100%", minWidth:"800px" }}>
                                <Outlet />
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>

        </>
    )
}
