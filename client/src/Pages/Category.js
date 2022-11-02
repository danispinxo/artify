import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Currency } from "react-tender";
import axios from "axios";
import "../styles/artForCategory.scss";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

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
      <div className="cat-container">
        {categoryArtwork.length > 0 &&
          categoryArtwork.map((artwork, i) => (
            <Card className="category-unit" key={i}>
              <a href={"/product/" + artwork.artworksid}>
                <Card.Img
                  className="cat-img"
                  variant="top"
                  src={artwork.artworkimage}
                  alt={artwork.artworkname}
                />
              </a>
              <Card.Body className="cat-body">
                <Card.Title className="cat-title">
                  <Image
                    className="cat-avatar-img"
                    src={artwork.avatarimage}
                    alt={artwork.firstname + " " + artwork.lastname}
                  />
                  <Link className="cat-link" to={`/gallery/${artwork.user_id}`}>
                    {artwork.firstname} {artwork.lastname}
                  </Link>
                </Card.Title>
                <Card.Text>"{artwork.artworkname}" </Card.Text>
                <Card.Text>{artwork.description} </Card.Text>
                <Card.Text>
                  <Currency
                    value={artwork.price_cents / 100.0}
                    currency="CAD"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}
