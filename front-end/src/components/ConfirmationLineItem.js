import React, { useState } from 'react';
import '../styles/confirmation.scss'
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
    <div className="confirmation-line-item" key={index}>
      <img className="line-item-image" src={image} alt={name}></img>
      <div className="line-item-info">
        <h4>{name}</h4>
        <p><Currency value={price_cents / 100} currency="CAD" /></p>
          <StyledRating name="simple-controlled" value={rating} onChange={(event, newValue) => {setRating(newValue)}} />
      </div>
    </div>
  )
}



