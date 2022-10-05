import React, {useEffect, useState, useContext} from "react";
import { useSearchParams } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import { useNavigate } from "react-router";
import axios from "axios";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "../components/Button";
import Form from 'react-bootstrap/Form';

export default function EditArtwork(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dataState = useContext(DataContext);

  const [artworkID, setArtworkID] = useState();
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [existingArt, setExistingArt] = useState({});

  useEffect(() => {
    setArtworkID(searchParams.get('artworkID'));
  }, [searchParams]);

  useEffect(() => {
    if (artworkID) {
      const queryItem = {};
      queryItem.id = artworkID;

      axios.post("/api/profile/artwork", queryItem)
        .then((res) => {
          console.log(res.data);
          setExistingArt(res.data);
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }, [artworks, artworkID]);

  useEffect(() => {
    if (dataState.categories) {
      setArtworks(dataState.artworks);
      setCategories(dataState.categories);
    }
  }, [dataState, existingArt]);

  const editArtwork = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const categoryID = form.querySelector("#category").value;
    const name = form.querySelector("#title").value;
    const priceCents = form.querySelector("#price").value * 100;
    const description = form.querySelector("#description").value;

    const editedArtwork = {};
    editedArtwork.id = existingArt.id;
    editedArtwork.categoryID = categoryID ? categoryID : existingArt.category_id;
    editedArtwork.name = name ? name : existingArt.name;
    editedArtwork.price_cents = priceCents ? priceCents : existingArt.price_cents;
    editedArtwork.description = description ? description : existingArt.description;

    axios.put("/api/profile/edit-artwork", editedArtwork)
      .then((res) => {
        setExistingArt(res.data[0]);
      })
        .then((res) => {
          navigate("/profile/" + existingArt.user_id);
        });

  };

  const artworkCategory = (category_id) => {
    for (const category of categories) {
      if (category.id === existingArt.category_id) {
        return category.name;
      }
    }
  }

  return (
    <div className="edit-artwork">
      <h1>Edit This Artwork's Details</h1>

      <Image src={existingArt.image} alt={existingArt.name} rounded="true" width="250px" />
      <div className="edit-form">
      <Form onSubmit={editArtwork}>

          <Form.Group className="mb-3">
            <Form.Label>Category (Current Category: {artworkCategory(existingArt.category_id)}) </Form.Label>
            <Form.Select id="category">
              <option />
              {categories.map((category) => 
                <option key={category.id} value={category.id}>{category.name}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Artwork Title:</Form.Label>
            <Form.Control name="title" type="name" placeholder={existingArt.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="number" min="0.00" max="10000.00" step="0.01" placeholder={existingArt.price_cents / 100 + " "}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Artwork Description</Form.Label>
            <Form.Control as="textarea" placeholder={existingArt.description}/>
          </Form.Group>

          <Button message="Edit this Artwork" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}