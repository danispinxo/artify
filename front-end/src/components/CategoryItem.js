import Button from "./Button";
import "../styles/categoryitem.scss";
import { Link } from "react-router-dom";

export default function CategoryItem(props) {
  const { name, image, id } = props;

  return (
    <div className="categoryitem-container">
      <div className="category-image">
        <img src={image} alt={image} />
      </div>
      <div className="category-button">
      <Link to={`/category/${id}`} >
        <Button message={name} />
      </Link>
      </div>
    </div>
  );
}
