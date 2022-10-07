import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/confirmation.scss'
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/dataContext";
import { Currency } from 'react-tender';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';


export default function Confirmation() {
  const dataState = useContext(DataContext);
  const navigate = useNavigate();
  const firstName = dataState.user.first_name;
  const lastName = dataState.user.last_name;
  const [order, setOrder] = useState(0);

  const orderID = order.length > 0 && order[0].order_id;

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#d6a00a',
    }
  });

  useEffect(() => {
    axios.post(`/order/api/last`, { id: dataState.user.id  })
      .then((res) => {
        setOrder(res.data)        
      });
  }, [dataState]);

  return (
    <div className="confirmation">
      <h1 className="success-confirmation">Success {firstName} {lastName}, your order has been placed!</h1>
      <h3>Order No. {orderID}</h3>
      <FontAwesomeIcon icon={faCircleCheck} className="confirm-logo" />
      <Table striped>
        <tbody>
          {order.length > 0 && order.map((item, index) => (
          <tr className='line-item' key={index}>
            <td><Image src={item.image} alt={item.name} width="50px" /></td>
            <td>{item.name}</td>
            <td><Currency value={item.price_cents /100} currency="CAD" /></td>             
            <td><StyledRating name="simple-controlled" value={0} onChange={(event, newValue) => {
          console.log(newValue)}} /></td>
          </tr>))}
        </tbody>
      </Table>
      <h3>You will also receive a confirmation email outlining your order details</h3>
      
      <button className="back-to-home" onClick={()=> navigate('/')}>
        Continue Shopping
      </button>
    </div>
  )
}
