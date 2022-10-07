import "../styles/artistitem.scss";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Image from 'react-bootstrap/Image';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import "../styles/artistitem.scss";

export default function ArtistItem(props) {
  const { name, image, id, sample_art } = props;

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#d6a00a',
    }
  });

  return (
    <div>
      <Link className="artistitem-link" to={`/gallery/${id}`}>
      <Card className="artistitem-card">
        <Card.Img variant="top" src={sample_art} alt={image} className="artistitem-card-image" />
        <Card.Body className="artistitem-card-body">
          <Card.Title className="artistitem-card-title">
            <Image src={image} alt={name + "'s Avatar"} roundedCircle="true" className="artistitem-card-avatar-img"/>
            <div className="artist-name-and-rating">
            <h5>{name}</h5>
            <StyledRating name="simple-controlled" value={4} readOnly />              
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
      </Link>
  </div>
  );
}
