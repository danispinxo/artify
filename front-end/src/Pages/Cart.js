import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import "../styles/cart.scss";
import Image from 'react-bootstrap/Image';
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

  const handleDelete = (lineItemID, artwork_id) => {
    const itemInfo = {};
    itemInfo.lineItemID = lineItemID;

    Promise.all([
      axios.post(`order/api/remove`, itemInfo),
      axios.post("/api/product/rem-from-cart", {artwork_id: artwork_id})
    ])
    .then((res) => {
      const orderInfo = {};
      orderInfo.userID = user.id;
      axios.post(`order/api/cart`, orderInfo)
        .then((res) => {
          setCart(res.data);
        })
      })
  };


  return (
    <div className='cart'>
      {user.id && 
      <div className='logged-in-user-cart'>

        <div className='cart-header'>
          <Image className='avatar' src={user.avatar_image} alt="User's Name" roundedCircle="true" />
          <h1>{user.first_name}'s Cart</h1>        
        </div>

        <div className='cart-content'>
          <div className='cart-line-items'>
                {cart.length === 0 &&
                <p className="empty-cart-message">Your cart is empty.</p>
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
                    <td><button className="cart-line-delete" message="Remove" onClick={() => handleDelete(item.line_id, item.artwork_id)}>Remove</button></td>
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
            <div className="stripe-container">
              <StripeContainer cart={cart} setCart={setCart}/>
            </div>
            
          </div>
        </div>
      </div>
      }
      {!user.id &&
      <div className='unauthorized-cart'>
        <h1>Unauthorized Cart</h1>
        <div className='unauthorized-cart-message'>
          <p>It looks like you're not logged in! Register or log in to purchase artworks.</p>
        </div>
      </div>
      }
    </div>
  )
};