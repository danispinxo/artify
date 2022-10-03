import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/artForCategory.scss";

export default function Category(props) {
  const { id } = useParams();
  const [categoryArtwork, setCategoryArtwork] = useState({});

  useEffect(() => {
    axios
      .get(`/api/categoryItem`, { params: { id: id } })
      .then((res) => setCategoryArtwork(res.data));
  }, [id]);

  return (
    <div className="category-page-container">
      <h1>{categoryArtwork.length > 0 && categoryArtwork[0].categoryname}</h1>

      {categoryArtwork.length > 0 &&
        categoryArtwork.map((artwork, i) => (
          <div className="category-unit" key={i}>
            <img src={`/${artwork.artworkimage}`} alt={artwork.artworkimage} />
            <div className="artwork-category-info-container">
              <p>{artwork.artworkname}</p>
              <p>{artwork.description}</p>
              <p>${artwork.price_cents / 100}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
