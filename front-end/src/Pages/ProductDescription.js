import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/productInfo.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/dataContext";
import { Currency } from 'react-tender';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

export default function ProductDescription({cart, setCart}) {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const dataState = useContext(DataContext);
  const [addedToCart, setAddedToCart] = useState(false);
  const user = dataState.user; // context for current user

  useEffect(() => {
    const orderInfo = {};
    orderInfo.userID = user.id;
    axios.post("/order/api/cart", orderInfo)
      .then((res) => {
        setCart(res.data);
      })
  }, [addedToCart, setCart, user]);

  useEffect(() => {
    axios
      .get(`/api/product`, { params: { id: id } })
      .then((res) => setProduct(res.data))
  }, [id]);

  const handleAddToCart = event => {
    event.preventDefault();

    if (!user.id) {
      alert("You can't add to cart without signing in!")
    }
    
    const orderInfo = {};
    orderInfo.userID = user.id;
    orderInfo.artworkID = product.id;
    orderInfo.price = product.price_cents;

    axios.put("/order/api/add", orderInfo)
    .then((all) => {
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
    });
  }

  return (
    <div className="product-description-container">
      
      <div className="product-description-body">
      <div className="product-description-image-container" >
        {product.image && <img className="product-description-image" src={product.image} alt={product.image} />}
      </div>

      <div className="product-description-info">
      <div className="product-description-name">
        <p>{product.name} </p>
      </div>
      <div className="product-description-description">
        <p>{product.description}</p>
      </div>

      <div className="product-description-price">
        <p><Currency value={product.price_cents/100.00} currency="CAD" /></p>
      </div>
      
      {!product.sold && dataState.user.id && 
      <div className="product-description-button-cont">

        <button className="product-description-add-to-cart-button" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faCartPlus} />
          Add to Cart
        </button>

        <ToastContainer position={'middle-center'}>
          <Toast show={addedToCart} >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body>You've just added this sweet piece of art to your cart!</Toast.Body>
          </Toast>          
        </ToastContainer>
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
