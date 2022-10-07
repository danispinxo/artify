import React, {useState, useEffect} from "react";
import axios from "axios";
import "./OrderHistory.scss";
import Card from 'react-bootstrap/Card';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { Currency } from 'react-tender';

export default function Purchases({user}) {
  const [purchasedArtworks, setPurchasedArtworks] = useState([]);

  useEffect(() => {
    axios.get("/order/api/purchased",  { params: { id: user.id } })
    .then((all) => {
      setPurchasedArtworks(all.data)
    })
  },[user.id])

  return (
    <div className="order-history-sold-purchases-list">
      <h1>Your Purchased Artworks</h1>
      <div className="order-history-list">
      {purchasedArtworks.length >= 1 && purchasedArtworks.map((order, index) => 
        <Card className="order-history-card" key={index} >
          <Card.Img className="order-history-card-img" variant="top" src={order.image} alt={order.name} />
          <Card.Body>
            <Card.Title>Order No. {order.order_id}</Card.Title>
            <Card.Text>
              <SimpleDateTime dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">{order.order_date}</SimpleDateTime>
            </Card.Text>
            <Card.Text>{order.name}</Card.Text>
            <Card.Text><Currency value={order.price_cents / 100.00} currency="CAD" /></Card.Text>
            <Card.Text>{order.description}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Link className="order-history-card-link" href={"/gallery/" + order.user_id}>View Artist's Gallery</Card.Link>
          </Card.Body>
        </Card>
      )}

      {purchasedArtworks.length === 0 && <p>
        It doesn't look like you've made any purchases yet! Why not check out some of our featured artists on the homepage!?
      </p>}
      </div>
    </div>
  )
}