import React, {useState, useEffect} from "react";
import axios from "axios";
import "./OrderHistory.scss"
import Card from 'react-bootstrap/Card';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { Currency } from 'react-tender';

export default function Sold({user}) {
  const [soldArtworks, setSoldArtworks] = useState([]);

  useEffect(() => {
    axios.get("/order/api/sold", { params: { id: user.id } })
      .then((all) => {
      setSoldArtworks(all.data)
    })
  },[user])

  return (
    <div className="order-history-sold-purchases-list">
      <h1>Your Sold Artworks</h1>
      <div className="order-history-list">
        {soldArtworks.length >= 1 && soldArtworks.map((order, index) => 
        <Card className="order-history-card" key={index}>
          <Card.Img className="order-history-card-img" variant="top" src={order.image} alt={order.name}/>
          <Card.Body>
            <Card.Title>Order No. {order.order_id}</Card.Title>
            <Card.Text>
              <SimpleDateTime dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">{order.order_date}</SimpleDateTime>
            </Card.Text>
            <Card.Text>
              {order.name}
            </Card.Text>
            <Card.Text>
              <Currency value={order.price_cents / 100.00} currency="CAD" />
            </Card.Text>
            <Card.Text>
              {order.description}
            </Card.Text>
          </Card.Body>
        </Card>        
        )}
        {soldArtworks.length === 0 && <p>
          It doesn't look like you've sold any art, yet. Add some new artwork by clicking "Add to Gallery" above. 
        </p>}
      </div>
    </div>
  )
}