import React, {useState, useEffect, useContext} from "react";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import '../styles/button.scss';
import '../styles/addartwork.scss';
import Form from 'react-bootstrap/Form';

export default function AddArtwork({setMode, user}) {
  const dataState = useContext(DataContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const VIEW = 'VIEW';

  useEffect(() => {
    if (dataState.categories) {
      setCategories(dataState.categories);
    }
  }, [dataState]);

  const submitArtwork = event => {
    event.preventDefault();
    // This part retrieves the file from the change-avatar form
    const form = event.currentTarget;
    const categoryID = form.querySelector("#category").value;
    const name = form.querySelector("#title").value;
    const priceCents = form.querySelector("#price").value * 100;
    const description = form.querySelector("#description").value;
    const fileUpload = form.querySelector("#add-artwork").files[0];

    if (fileUpload.size >= 10000000) {
      setError("This file size is too large. Maximum file size: 10MB.")
      return;
    }

    setIsLoading(true)
    
    // This part creates a FormData object, it includes 2 things: 1. details from the artwork, 2. the file
    const formData = new FormData();
    formData.append("userID", user.id);
    formData.append("categoryID", categoryID);
    formData.append("name", name);
    formData.append("priceCents", priceCents);
    formData.append("description", description);
    formData.append("artwork", fileUpload);

    // Makes put request with second arg., the form data with the above info
    axios.put("/api/profile/add", formData)
      .then((all) => {
        // Then once complete
        setMode(VIEW);
        setIsLoading(false);
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div className="add-artwork-container">
      <h1>Add New Artwork</h1>
      
        <Form onSubmit={submitArtwork} className="add-artwork-form">
          <Form.Group className="mb-3" controlId="add-artwork" >
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control type="file" className="add-artwork-form-control" required />
            <Form.Control.Feedback type="invalid">Please upload your artwork image file.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="add-artwork-label">Category: </Form.Label>
            <Form.Select id="category" className="add-artwork-form-select" >
              {categories.map((category) => 
                <option key={category.id} value={category.id}>{category.name}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="add-artwork-label">Artwork Title:</Form.Label>
            <Form.Control name="title" type="name" className="add-artwork-form-control"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label className="add-artwork-label">Price: </Form.Label>
            <Form.Control name="price" type="number" min="0.00" max="10000.00" step="0.01" defaultValue="10.00" className="add-artwork-form-control"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="add-artwork-label">Artwork Description:</Form.Label>
            <Form.Control as="textarea" className="add-artwork-form-control"/>
          </Form.Group>
        
          {isLoading && <button variant="primary" type="submit" >
            Add Artwork to Gallery
            <i className="fas fa-spinner fa-spin"></i>
            </ button>}
          {!isLoading && <button  variant="primary" type="submit" >
            Add Artwork to Gallery
            </ button>}

          <div className="error-messages">
            {error && <p className="error-message">{error}</p>}
          </div>
         
        </Form>
    </div>
  )
}      