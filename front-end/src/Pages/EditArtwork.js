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
  const dataState = useContext(DataContext);
  const artworkID = searchParams.get('artworkID');
// use a router link and do the axios call here
// pass it the artwork object in the query string (use the examples from header and search results)
// And this link would ONLY work if the logged in user id === user id for that artwork, if not show unauthorized message

  const [edits, setEdits] = useState({});
  const [categories, setCategories] = useState([]);

  const VIEW = 'VIEW';

  useEffect(() => {
    if (dataState.categories) {
      setCategories(dataState.categories);
    }
  }, [dataState]);

  const artworkEdits = {};

  const editArtwork = (edits, user) => {
    const editedArtwork = {};
    // this creates an edited user to submit with the put request, either with the old or the new information
    editedArtwork.id = artworkID;
    // edits.first_name ? editedUser.first_name = edits.first_name : editedUser.first_name = user.first_name;
    // edits.last_name ? editedUser.last_name = edits.last_name : editedUser.last_name = user.last_name;
    // edits.bio ? editedUser.bio = edits.bio : editedUser.bio = user.bio;

    setEdits(editedArtwork);
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
            <Form.Control name="title" type="name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="number" min="0.00" max="10000.00" step="0.01" defaultValue="10.00" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Artwork Description</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>

          <Button message="Add Artwork to Gallery" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}