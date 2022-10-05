import "../styles/artistitem.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Card from "react-bootstrap/Card";
import Image from 'react-bootstrap/Image';

export default function ArtistItem(props) {
  const { name, image, id, sample_art } = props;

  return (
    <div className="artistitem-container">
      <Link className="card" to={`/gallery/${id}`}>
      <Card className="category-body">
        <Card.Img variant="top" src={sample_art} alt={image} className="card-image" />
        <Card.Body >
          <Card.Title className="card-title">
            <Image src={image} alt={name + "'s Avatar"} roundedCircle="true" width="75px" />
            <div className="contact">
              <h5>{name}</h5>
              <FontAwesomeIcon icon={faEnvelope} />              
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
      </Link>
  </div>
  );
}
