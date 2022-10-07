import React, { useContext } from 'react'
import '../styles/confirmation.scss'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/dataContext";


export default function Confirmation() {
  const dataState = useContext(DataContext);
  const navigate = useNavigate();
  const firstName = dataState.user.first_name;
  const lastName = dataState.user.last_name;

  

  return (
    <div className="confirmation">

   <h1 className="success-confirmation"><strong>Success {firstName} {lastName}, your order has been placed!</strong></h1>
   <FontAwesomeIcon icon={faCircleCheck} className="confirm-logo" />
   <h3>You will receive a confirmation email outlining your order details</h3>
    <button className="back-to-home" onClick={()=> navigate('/')}>Continue Shopping</button>
    

    </div>
  )
}
