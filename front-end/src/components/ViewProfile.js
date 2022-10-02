import React from "react";
import '../styles/button.scss';
import Card from 'react-bootstrap/Card';

export default function ViewProfile() {

  const sampleArtArray = ["images/artwork/8-7.jpeg", "images/artwork/8-6.jpeg", "images/artwork/8-5.jpeg", "images/artwork/8-4.jpeg", "images/artwork/8-3.jpeg", "images/artwork/8-2.jpeg", "images/artwork/8-1.jpeg"];

  return (
    <div className="view-profile">
      <p>Images Currently in Your Gallery:</p>
      <div className="user-gallery">
        {sampleArtArray.map(art => 
          <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={art}/>
            <Card.Body>
              <Card.Title>Painting Title</Card.Title>
            </Card.Body>
          </Card>
        )}

      </div>
    </div>
  )
}