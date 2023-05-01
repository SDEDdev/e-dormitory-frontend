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
    path:"/account/login",
    element:<LoginPage/>
  },
  {
    path:"/account/sign-up",
    element:<RegisterPage/>
  },
]);
// axios.defaults.baseURL = 'https://e-dormitory.sded.cf';
axios.defaults.baseURL = process.env.REACT_APP_API;
//axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

