import React, {useEffect, useState, useContext} from "react";
import { useSearchParams } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "../components/Button";
import Form from 'react-bootstrap/Form';

export default function EditArtwork(props) {
  const [searchParams] = useSearchParams();
  const artworkID = searchParams.get('artworkID');

  const dataState = useContext(DataContext);

  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editedArt, setEditedArt] = useState({});

// do the axios call here
// pass it the artwork object in the query string (use the examples from header and search results)
// And this link would ONLY work if the logged in user id === user id for that artwork, if not show unauthorized message


  useEffect(() => {
    if (dataState.categories) {
      setArtworks(dataState.artworks);
      setCategories(dataState.categories);
    }
  }, [dataState]);

  useEffect(() => {
    for (let artwork of artworks) {
      if (artwork.id === Number(artworkID)) {
        setEditedArt(artwork);
      }
    }
  }, [artworks, artworkID]);

  const editArtwork = event => {
    event.preventDefault();

    // This part retrieves the file from the change-avatar form
    const form = event.currentTarget;
    const categoryID = form.querySelector("#category").value;
    const name = form.querySelector("#title").value;
    const priceCents = form.querySelector("#price").value * 100;
    const description = form.querySelector("#description").value;

    // This part creates a FormData object, it includes 2 things: 1. text (the user.id), 2. the file
    const formData = new FormData();
    formData.append("userID", editedArt.user_id);
    formData.append("categoryID", categoryID);
    formData.append("name", name ? name : editedArt.name);
    formData.append("priceCents", priceCents);
    formData.append("description", description);

  };

  return (
    <div className="edit-artwork">
      <h1>Edit This Artwork's Details</h1>

      <div className="edit-form">
      <Form onSubmit={editArtwork}>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select id="category">
              {categories.map((category) => 
                <option key={category.id} value={category.id}>{category.name}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Artwork Title:</Form.Label>
            <Form.Control name="title" type="name" placeholder={editedArt.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="number" min="0.00" max="10000.00" step="0.01" placeholder={editedArt.price_cents / 100 + " "}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Artwork Description</Form.Label>
            <Form.Control as="textarea" placeholder={editedArt.description}/>
          </Form.Group>

          <Button message="Edit this Artwork" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}