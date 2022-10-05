import "../styles/categoryitem.scss";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function CategoryItem(props) {
  const { name, image, id } = props;

  return (
    <div className="categoryitem-container">
      <Link className="card5" to={`/category/${id}`}>
      <Card className="category-body">
        <Card.Img variant="top" src={image} alt={image} className="card-image" />
        <Card.Body >
          <Card.Title className="card-title2">
            <h5>{name}</h5>
          </Card.Title>
        </Card.Body>
      </Card>
      </Link>
  </div>
  );
}
