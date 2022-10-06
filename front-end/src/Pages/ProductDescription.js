import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/productInfo.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/dataContext";
import { Currency } from 'react-tender';
import { useNavigate } from "react-router";

export default function ProductDescription(props) {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const dataState = useContext(DataContext);
  const navigate = useNavigate();
  const user = dataState.user; // context for current user

  useEffect(() => {
    axios
      .get(`/api/product`, { params: { id: id } })
      .then((res) => setProduct(res.data))
  }, [id]);

  const handleAddToCart = event => {
    event.preventDefault();

    const orderInfo = {};
    orderInfo.userID = user.id;
    orderInfo.artworkID = product.id;
    orderInfo.price = product.price_cents;

    axios.put("/order/api/add", orderInfo)
    .then((all) => {
      alert('You add this item to your cart!');
      navigate("/cart");
    });
  }

  return (
    <div className="product-description-container">
      <div className="product-description-name">
        <h1>{product.name} </h1>
      </div>
      <div className="product-description-body">
      <div className="product-description-image-container" >
        {product.image && <img className="product-description-image" src={product.image} alt={product.image} />}
      </div>

      <div className="product-description-info">

      <div className="product-description-description">
        <h3>{product.description}</h3>
      </div>

      <div className="product-description-price">
        <h3><Currency value={product.price_cents/100.00} currency="CAD" /></h3>
      </div>
      
      {!product.sold && dataState.user.id && 
      <div className="product-description-button-cont">
        <button  className="product-description-add-to-cart-button" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faCartPlus} />
          Add to Cart
        </button>
      </div>      
      }
      </div>
      </div>
      
      {product.sold &&
        <h2>This image has already been purchased!</h2>
      }

    </div>
  );
}
