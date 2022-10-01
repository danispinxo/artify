import Button from "./Button";
import "../styles/categoryitem.scss";

export default function CategoryItem(props) {
  const { name, image } = props;

  return (
    <div className="categoryitem-container">
      <div className="category-image">
        <img src={image} alt={image} />
      </div>
      <div className="category-button">
        <Button message={name} />
      </div>
    </div>
  );
}
