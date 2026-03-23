import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const ProtectedRoute = (component) => {
  const nav = useNavigate()

  useEffect(() =>{
    if(!sessionStorage.getItem("user")){
        nav("/login");
    }
  },[])
  
  
    return (
    <div>
        <component></component>
    </div>
  )
}

export default ProtectedRoute