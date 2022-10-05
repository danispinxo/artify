import React from "react";
import '../styles/button.scss';
import '../styles/profile.scss';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function ViewProfile({gallery}) {
  return (
    <div className="view-profile-container">
      <h1>Artworks Currently in Your Gallery</h1>
      <div className="view-profile-gallery">
        {gallery.map((art, index) => 
          <Card className="view-profile-card" key={index}>
            <div className="view-profile-card-img">
              <a href={"/product/" + art.id}>
              <Card.Img className="view-profile-card-img-top" variant="top" src={art.image} alt={art.name}/>
              {art.sold && 
              <div className="view-profile-card-img-after">
                <FontAwesomeIcon icon={faTag} />  SOLD
              </div>
              }
              </a>
            </div>
            <Card.Body className="view-profile-card-body">
              <Card.Title>{art.name}</Card.Title>
              <div>
              <Link to={``}><FontAwesomeIcon icon={faTrashCan} className="view-profile-card-buttons" /></Link>
              <Link to={``}><FontAwesomeIcon icon={faPenToSquare} className="view-profile-card-buttons" /></Link>
              </div>
            </Card.Body>
          </Card>
          
        )}

        {gallery.length === 0 &&
        <p>You do not currently have any artworks in your gallery.</p>
        }
      </div>
    </div>
  )
}