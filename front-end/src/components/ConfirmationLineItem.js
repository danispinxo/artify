import React, { useState } from 'react';
import '../styles/confirmation.scss'
import Image from 'react-bootstrap/Image';
import { Currency } from 'react-tender';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';


export default function ConfirmationLineItem({index, image, name, price_cents}) {
  const [rating, setRating] = useState([]);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#d6a00a',
    }
  });

  return (
    <div className="confirmation-line-item">
      <tr className='line-item' key={index}>
        <td><Image src={image} alt={name} width="50px" /></td>
        <td>{name}</td>
        <td><Currency value={price_cents /100} currency="CAD" /></td>             
        <td><StyledRating name="simple-controlled" value={rating} onChange={(event, newValue) => {
        setRating(newValue)}} /></td>
      </tr>
    </div>
  )
}



