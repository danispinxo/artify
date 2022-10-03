import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Product_description(props) {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios
      .get(`/api/product`, {params: {id:id}})
      .then((res) => setProduct(res.data))
  }, []);

  return (
    <div className="product-description-container">
      <div className="product-name">
        <h1>{product.name} </h1>
      </div>

      <div className="product-image">
        {product.image && <img src={`/${product.image}`} alt={product.image} />}
      </div>

      <div className="product-description">
        <h3>{product.description}</h3>
      </div>
    </div>
  );
}
