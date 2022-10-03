import React from "react";
import '../styles/button.scss';
import Card from 'react-bootstrap/Card';

export default function ViewProfile({gallery}) {

  return (
    <div className="view-profile">
      <h1>Artworks Currently in Your Gallery</h1>
      <div className="user-gallery">
        {gallery.map((art, index) => 
          <div key={index}>
          <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={"/" + art.image} alt={art.name}/>
            <Card.Body>
              <Card.Title>{art.name}</Card.Title>
            </Card.Body>
          </Card>
          </div>
        )}
      </div>
    </div>
  )
}