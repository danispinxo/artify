import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/productInfo.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default function ProductDescription(props) {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios
      .get(`/api/product`, { params: { id: id } })
      .then((res) => setProduct(res.data))
  }, [id]);

  return (
    <div className="product-description-container">
      <div className="product-name">
        <h1>{product.name} </h1>
      </div>

      <div className="product-image-container" >
        {product.image && <img className="product-image" src={product.image} alt={product.image} width="50%"/>}
      </div>

      <div className="product-description-container">
        <h3>{product.description}</h3>
      </div>

      <div className="product-price-container">
        <h3>${product.price_cents/100.00}</h3>
      </div>
      {!product.sold &&
      <div className="add-to-cart-button-container">
        <button>
          <FontAwesomeIcon icon={faCartPlus} />
          Add to Cart
        </button>
      </div>      
      }
      {product.sold &&
        <h2>This image has already been purchased!</h2>
      }

    </div>
  );
}
