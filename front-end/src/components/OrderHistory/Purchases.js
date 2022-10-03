import React from "react";
import "./OrderHistory.scss";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SimpleDateTime  from 'react-simple-timestamp-to-date';

export default function Purchases({orders}) {

  return (
    <div className="order-history">
      <h1>Your Purchased Artworks</h1>
      <div className="order-list">
      {orders.length >= 1 && orders.map((order, index) => 
        <Card style={{ width: '14rem' }} key={index} >
          <Card.Img variant="top" src={order.image} alt={order.name} />
          <Card.Body>
            <Card.Title>Order No. {order.order_id}</Card.Title>
            <Card.Text>
              <SimpleDateTime dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">{order.order_date}</SimpleDateTime>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{order.name}</ListGroup.Item>
            <ListGroup.Item>${order.price_cents / 100.00}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Text>{order.description}</Card.Text>
            <Card.Link href="#">View Artist's Gallery</Card.Link>
          </Card.Body>
        </Card>
      )}

      {orders.length === 0 && <p>
        It doesn't look like you've made any purchases yet! Why not check out some of our featured artists on the homepage!?
      </p>}
      </div>
    </div>
  )
}