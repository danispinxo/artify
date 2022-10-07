import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/confirmation.scss';
import Table from 'react-bootstrap/Table';
import ConfirmationLineItem from '../components/ConfirmationLineItem';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/dataContext";


export default function Confirmation() {
  const dataState = useContext(DataContext);
  const navigate = useNavigate();
  const firstName = dataState.user.first_name;
  const lastName = dataState.user.last_name;
  const [order, setOrder] = useState(0);

  const orderID = order.length > 0 && order[0].order_id;

  useEffect(() => {
    axios.post(`/order/api/last`, { id: dataState.user.id  })
      .then((res) => {
        setOrder(res.data);
      });
  }, [dataState.user.id]);

  return (
    <div className="confirmation">
      <h1 className="success-confirmation">Success {firstName} {lastName}, your order has been placed!</h1>
      <h3>Order No. {orderID}</h3>
      <FontAwesomeIcon icon={faCircleCheck} className="confirm-logo" />
      <table>
        <tbody>
          {order.length > 0 && order.map((item, index) => (
            <ConfirmationLineItem index={index} image={item.image} name={item.name} price_cents={item.price_cents} />
          ))}
        </tbody>
      </table>
      <h3>You will also receive a confirmation email outlining your order details</h3>
      
      <button className="back-to-home" onClick={()=> navigate('/')}>
        Continue Shopping
      </button>
    </div>
  )
}
