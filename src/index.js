import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';

import Cookies from 'js-cookie';

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
import UsersDashboardComponent from './components/DashboardPageComponent/UsersDPageComponent/index';
import FacultiesDashboardComponent from './components/DashboardPageComponent/FacultiesDPageComponent';
import DormitoriesDashboardComponent from './components/DashboardPageComponent/DormitoriesDPageComponent';

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
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/dashboard",
    element: <AdminPage/>,
    children: [
      {
        path: "users",
        element: <UsersDashboardComponent/>,
      },
      {
        path: "faculties",
        element: <FacultiesDashboardComponent/>,
      },
      {
        path: "dormitories",
        element: <DormitoriesDashboardComponent/>,
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
const  token  = Cookies.get("token");
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

