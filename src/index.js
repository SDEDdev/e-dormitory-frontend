import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// React router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Page
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

