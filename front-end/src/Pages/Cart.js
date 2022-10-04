import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import "../styles/cart.scss";
import Image from 'react-bootstrap/Image';
import Button from '../components/Button';
import Table from 'react-bootstrap/Table';
import { DataContext } from "../context/dataContext";
import { Currency } from 'react-tender';

export default function Cart(props) {

  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const dataState = useContext(DataContext);
  const user = dataState.user; // context for current user

  console.log(dataState.user, 'fdsafadsfdsafds')
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
    axios.get(`order/api/cart`)
      .then((res) => {
        setCart(res.data);
      })
  }, []);


  useEffect(() => {
    setSubtotal(orderTotal(cart));
  }, [cart]);

  const showSubtotal = subtotal / 100;
  const HST = showSubtotal * 0.13;
  const total = showSubtotal + HST;


  return (
    <div className='cart'>
      <div className='cart-header'>
        <Image src="https://res.cloudinary.com/dckcnn64n/image/upload/v1664824256/avatars/sara_plrv5c.jpg" alt="User's Name" roundedCircle="true" width="75px" />
        <h1>{user.first_name} Cart</h1>
      </div>
      <div className='cart-content'>

        <div className='cart-line-items'>
          <Table striped>
            <tbody>
              {cart.length > 0 &&
              cart.map((item, index) => (
                <tr className='line-item' key={index}>
                  <td>
                    <Image src={item.image} alt={item.name} width="50px" />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <Currency
                      value={item.price_cents /100}
                      currency="CAD"
                    />
                  </td>
                  <td><Button message="Remove" /></td>
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
                <td>
                <Currency
                  value={showSubtotal}
                  currency="CAD"
                />
                </td>
              </tr>
              <tr>
                <th>HST (13%)</th>
                <td>
                <Currency
                  value={HST}
                  currency="CAD"
                />
                </td>
              </tr>
              <tr>
                <th>Order Total</th>

                <td>
                <Currency
                  value={total}
                  currency="CAD"
                />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button message="Checkout" />
        </div>

      </div>
    </div>
  )
};