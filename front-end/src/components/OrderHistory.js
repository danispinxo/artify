import React from "react";
import '../styles/button.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function OrderHistory() {
  return (
    <div className="order-history">
      <h1>Your Order History</h1>
      <div className="order-list">
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src="images/artwork/8-7.jpeg" />
          <Card.Body>
            <Card.Title>Order No. #</Card.Title>
            <Card.Text>
              Date of Purchase
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Name of Painting</ListGroup.Item>
            <ListGroup.Item>Price of Painting</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Text><b>Painting Description:</b> This would be done in here with a map over the array of the user's purchases, which means somewhere along the line we will have to add the user's purchases to the route and pass it to this component as props</Card.Text>
            <Card.Link href="#">View Artist's Gallery</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}