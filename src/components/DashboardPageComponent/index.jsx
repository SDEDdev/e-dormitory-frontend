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
    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", borderRight: "solid 1px #f1f1f1f1" }}>
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
    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", borderRight: "solid 1px #f1f1f1f1" }}>
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
            <NavLink to={"room-settings"}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "#62b42e" : "#000",
                    };
                }}>
                Налаштування кімнат
            </NavLink>
        </Button>
     
        
    </Grid>
)

export default function DashboardPageComponent() {
    const user = JSON.parse(Cookies.get("user") || null);
    return (
        <>
            <MainPageHeader />
            <Container sx={{ marginTop: "20px" }}>
                <Paper sx={{ p: "15px" }}>
                    <Grid container >
                        {user?.roles[0] === "admin"  && AdminRoutes}
                        {user?.roles[0] === "dean"  && DeanRoutes}
                        {user?.roles[0] === "commandant"  && CommRoutes}
                        <Grid item xs={10} sx={{ p: "15px" }}>
                            <Box sx={{ width: "100%" }}>
                                <Outlet />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

        </>
    )
}
