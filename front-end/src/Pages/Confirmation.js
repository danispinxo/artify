import React from 'react'
import '../styles/confirmation.scss'
import { useNavigate } from "react-router";



export default function Confirmation() {
  const navigate = useNavigate();
  return (
    <div className="confirmation">
    <h1>Success, your order has been placed</h1>

    
    <button className="back-to-home" onClick={()=> navigate('/')}>Back to home</button>
    

    </div>
  )
}
