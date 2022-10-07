import React, { useState } from 'react';
import axios from 'axios';
import '../styles/confirmation.scss'
import { Currency } from 'react-tender';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';


export default function ConfirmationLineItem({key, image, name, price_cents, artist, customer}) {
  const [rating, setRating] = useState(0);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#d6a00a',
    }
  });

  const ratingHandler = (rating) => {
    //addRating = (customer_id, artist_id, rating) 

    const ratingObject = {};
    ratingObject.customer_id = artist;
    ratingObject.artist_id = customer;
    ratingObject.rating = rating;
    console.log(ratingObject);
    axios.post("/api/ratings/add", ratingObject)
    .then((res) => {
      setRating(rating);
    });
  }

  return (
    <div className="confirmation-line-item" key={key}>
      <img className="line-item-image" src={image} alt={name}></img>
      <div className="line-item-info">
        <h4>{name}</h4>
        <p><Currency value={price_cents / 100} currency="CAD" /></p>
          <StyledRating name="simple-controlled" value={rating} onChange={(event, newValue) => ratingHandler(newValue)} />
      </div>
    </div>
  )
}



