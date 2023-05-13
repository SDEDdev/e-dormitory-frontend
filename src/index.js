import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';


// React router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Page
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage/index';
import AdminPage from './pages/AdminPage';
import BenefitsPage from './pages/AdminPage/BenefitsPage';
import DormitoriesPage from './pages/AdminPage/Dormitories';
import FacultiesPage from './pages/AdminPage/FacultiesPage';
import UsersPage from './pages/AdminPage/UsersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import DateSettingsPage from './pages/AdminPage/DateSettingsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: "/order",
    element: <OrderPage/>,
  },
  {
    path: "/create-order",
    element: <CreateOrderPage/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/dashboard",
    element: <AdminPage/>,
    children: [
      {
        path: "users",
        element: <UsersPage/>,
      },
      {
        path: "faculties",
        element: <FacultiesPage/>,
      },
      {
        path: "dormitories",
        element: <DormitoriesPage/>,
      },
      {
        path: "benefits",
        element: <BenefitsPage/>,
      },
      {
        path: "orders",
        element: <>Orders</>,
      },
      {
        path: "date-settings",
        element: <DateSettingsPage/>,
      },
    ],
  },
  {
    path:"/account/login",
    element:<LoginPage/>
  },
  {
    path:"/account/sign-up",
    element:<RegisterPage/>
  },
]);


axios.defaults.baseURL = process.env.REACT_APP_API;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

