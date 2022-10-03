import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import '../styles/button.scss';
import Button from "./Button";
import Form from 'react-bootstrap/Form';
import { DataContext } from "../context/dataContext";

export default function AddArtwork({setMode, user}) {
  const dataState = useContext(DataContext);
  const [categories, setCategories] = useState([]);

  const VIEW = 'VIEW';

  useEffect(() => {
    if (dataState.categories) {
      setCategories(dataState.categories);
    }
  }, [dataState]);

  const submitArtwork = event => {
    event.preventDefault();

    console.log(event);
    // This part retrieves the file from the change-avatar form
    // const form = event.currentTarget;
    // const fileUploadInput = form.querySelector("#change-avatar");
    // const fileUpload = fileUploadInput.files[0];
    
    // // This part creates a FormData object, it includes 2 things: 1. text (the user.id), 2. the file
    // const formData = new FormData();
    // formData.append("userID", user.id);
    // formData.append("avatar", fileUpload);

    // // Makes put request with second arg., the form data with the above info
    // axios.put("/api/profile/add", formData)
    //   .then((all) => {
    //     // Then once complete
    //     setMode(VIEW);
    //   });
  };


  return (
    <div className="add-artwork">
      <h1>Add New Artwork</h1>
      <div className="add-artwork-form">
        <Form onSubmit={submitArtwork}>
          <Form.Group className="mb-3" controlId="add-artwork">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select id="category">
              {categories.map((category) => 
                <option key={category.id}>{category.name}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Artwork Title:</Form.Label>
            <Form.Control name="title" type="name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="currency" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Artwork Description</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>

          <Button message="Add Artwork to Gallery" variant="primary" type="submit" onClick={() => console.log(dataState)}/>
        </Form>
      </div>
    </div>
  )
}