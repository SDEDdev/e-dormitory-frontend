import React, { useEffect } from 'react'

import { parseCookies } from 'nookies'
import { useNavigate } from 'react-router-dom'
//Page component
import ProfilePageComponent from '../../components/ProfilePageComponent';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { token } = parseCookies()
    useEffect(() => {
      if(!token){
        navigate("/account/login");
      }
    }, [])
    
  return (
    <>
        {token ? <ProfilePageComponent/> : <div>Ви не авторизовані</div>}
    </>
  )
}
