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
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
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
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

