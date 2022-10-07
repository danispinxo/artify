import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import "../styles/cart.scss";
import Image from 'react-bootstrap/Image';
import Button from '../components/Button';
import Table from 'react-bootstrap/Table';
import { DataContext } from "../context/dataContext";
import { Currency } from 'react-tender';
import StripeContainer from '../components/StripeContainer';

export default function Cart({cart, setCart}) {
  const [subtotal, setSubtotal] = useState(0);
  const dataState = useContext(DataContext);
  const user = dataState.user; // context for current user

  const orderTotal = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      for (const item of cart) {
        total += item.price_cents
      }
    }
    return total;
  };

  useEffect(() => {
    const orderInfo = {};
    orderInfo.userID = user.id;
    axios.post(`order/api/cart`, orderInfo)
      .then((res) => {
        setCart(res.data);
      })
  }, [setCart, user]);

  useEffect(() => {
    setSubtotal(orderTotal(cart));
  }, [cart]);

  const showSubtotal = subtotal / 100;
  const HST = showSubtotal * 0.13;
  const total = showSubtotal + HST;

  const handleDelete = (lineItemID) => {
    const itemInfo = {};
    itemInfo.lineItemID = lineItemID;
    axios.post(`order/api/remove`, itemInfo)
    .then((res) => {
      const orderInfo = {};
      orderInfo.userID = user.id;
      axios.post(`order/api/cart`, orderInfo)
        .then((res) => {
          setCart(res.data);
        })
      })
  };

  const handleEmptyCart = () => {
    const orderId = cart[0].order_id
    
    Promise.all([
      axios.put('/emptycart', {orderId}),
      axios.put('/sold', {orderId})
    ])
    .then((res) => {
        const orderInfo = {};
        orderInfo.userID = user.id;
       
          axios.post(`order/api/cart`, orderInfo)
            .then((res) => {
              setCart(res.data);
            })
       
    })
  }
  
  return (
    <div className='cart'>
      {user.id && 
      <div className='logged-in-user-cart'>

        <div className='cart-header'>
          <Image src={user.avatar_image} alt="User's Name" roundedCircle="true" width="75px" />
          <h1>{user.first_name}'s Cart</h1>        
        </div>

        <div className='cart-content'>
          <div className='cart-line-items'>
                {cart.length === 0 &&
                <p>Your cart is empty.</p>
                }
            <Table striped>
              <tbody>
                {cart.length > 0 &&
                cart.map((item, index) => (
                  <tr className='line-item' key={index}>
                    <td>
                      <Image src={item.image} alt={item.name} width="50px" />
                    </td>
                    <td>{item.name}</td>
                    <td> <Currency value={item.price_cents /100} currency="CAD" /> </td>
                    <td><Button message="Remove" onClick={() => handleDelete(item.line_id)}/></td>
                  </tr>      
                ))}
              </tbody>
            </Table>
          </div>

          <div className='cart-totals'>
            <Table>
              <tbody>
                <tr className='line-item'>
                  <th>Subtotal</th>
                  <td><Currency value={showSubtotal} currency="CAD"/></td>
                </tr>
                <tr>
                  <th>HST (13%)</th>
                  <td><Currency value={HST} currency="CAD"/></td>
                </tr>
                <tr>
                  <th>Order Total</th>
                  <td><Currency value={total} currency="CAD"/></td>
                </tr>
              </tbody>
              
            </Table>
            <div onClick={handleEmptyCart} className="stripe-container">
              <StripeContainer cart={cart}/>
            </div>
            
          </div>
        </div>
      </div>
      }
      {!user.id &&
      <div className='unauthorized-cart'>
        <h1>Unauthorized Cart</h1>
        <div className='message'>
          <p>It looks like you're not logged in! Only registered and logged-in users can purchase artworks at Artify!</p>
        </div>
      </div>
      }
    </div>
  )
};