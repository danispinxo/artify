import "../styles/artistitem.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Card from "react-bootstrap/Card";
import Image from 'react-bootstrap/Image';
import "../styles/artistitem.scss";

export default function ArtistItem(props) {
  const { name, image, id, sample_art } = props;

  return (
    <div>
      <Link className="artistitem-link" to={`/gallery/${id}`}>
      <Card className="artistitem-card">
        <Card.Img variant="top" src={sample_art} alt={image} className="artistitem-card-image" />
        <Card.Body className="artistitem-card-body">
          <Card.Title className="artistitem-card-title">
            <div className="artistitem-card-title-av">
            <Image src={image} alt={name + "'s Avatar"} roundedCircle="true" className="artistitem-card-avatar-img"/>
              <h5>{name}</h5>
            </div>
            <div className="artistitem-contact">
              <FontAwesomeIcon icon={faEnvelope} />              
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
      </Link>
  </div>
  );
}
