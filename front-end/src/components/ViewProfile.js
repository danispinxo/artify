import React from "react";
import '../styles/button.scss';
import '../styles/profile.scss';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function ViewProfile({gallery}) {

  return (
    <div className="view-profile">
      <h1>Artworks Currently in Your Gallery</h1>
      <div className="user-gallery">
        {gallery.map((art, index) => 
          <div key={index}>
          <Card style={{ width: '14rem' }}>
            <div className="card-image">
              <a href={"/product/" + art.id}>
              <Card.Img variant="top" src={art.image} alt={art.name}/>
              {art.sold && 
              <div className="after">
                <FontAwesomeIcon icon={faTag} />  SOLD
              </div>            
              }
              </a>
            </div>
            <Card.Body>
              <Card.Title>{art.name}</Card.Title>
            </Card.Body>
          </Card>
          </div>
        )}

        {gallery.length === 0 &&
        <p>You do not currently have any artworks in your gallery.</p>
        }
      </div>
    </div>
  )
}