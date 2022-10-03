import React from "react";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "./Button";
import Form from 'react-bootstrap/Form';

export default function AddArtwork({user}) {
  return (
    <div className="add-artwork">
      <h1>Add a New Artwork</h1>
      <div className="add-artwork-form">
        <Form>
          <Form.Group className="mb-3" controlId="Add Artwork">
            <Form.Label>New Art to Add:</Form.Label>
            <Image className="add-artwork-preview" src={"/" + user.avatar_image} alt="Frankis Avatar" rounded="true" />
            <Form.Control type="file" />
          </Form.Group>
          <Button message="Add Artwork to Gallery" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}