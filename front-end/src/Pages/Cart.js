import React from 'react';
import "../styles/cart.scss";
import Image from 'react-bootstrap/Image';
import Button from '../components/Button';
import Table from 'react-bootstrap/Table';

export default function Cart(props) {

  return (
    <div className='cart'>
      <div className='cart-header'>
        <Image src="https://res.cloudinary.com/dckcnn64n/image/upload/v1664824256/avatars/sara_plrv5c.jpg" alt="User's Name" roundedCircle="true" width="75px" />
        <h1>Sample User's Cart</h1>
      </div>
      <div className='cart-content'>

        <div className='cart-line-items'>
          <Table striped>
            <tbody>
              <tr className='line-item'>
                <td>
                  <Image src="https://res.cloudinary.com/dckcnn64n/image/upload/v1664842059/artwork/5-3_jwxoxs.webp" alt="Sample Image" width="50px" />
                </td>
                <td>"Painting"</td>
                <td>$5.55</td>
                <td><Button message="Remove" /></td>
              </tr>
              <tr className='line-item'>
                <td>
                  <Image src="https://res.cloudinary.com/dckcnn64n/image/upload/v1664842059/artwork/5-3_jwxoxs.webp" alt="Sample Image" width="50px" />
                </td>
                <td>"Different Painting"</td>
                <td>$6.66</td>
                <td><Button message="Remove" /></td>
              </tr>
              <tr className='line-item'>
                <td>
                  <Image src="https://res.cloudinary.com/dckcnn64n/image/upload/v1664842059/artwork/5-3_jwxoxs.webp" alt="Sample Image" width="50px" />
                </td>
                <td>"Third Painting"</td>
                <td>$7.77</td>
                <td><Button message="Remove" /></td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className='cart-totals'>
        <Table>
            <tbody>
              <tr className='line-item'>
                <th>Subtotal</th>
                <td>$5.55</td>
              </tr>
              <tr>
                <th>HST</th>
                <td>$6.66</td>
              </tr>
              <tr>
                <th>Order Total</th>
                <td>$7.77</td>
              </tr>
            </tbody>
          </Table>
          <Button message="Checkout" />
        </div>

      </div>
    </div>
  )
};