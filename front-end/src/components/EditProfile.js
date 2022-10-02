import React from "react";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "./Button";
import Form from 'react-bootstrap/Form';

export default function EditProfile() {
  return (
    <div className="edit-profile">
      <h1>Edit Your Profile</h1>
      <div className="edit-form">
        <Form>
          <Form.Group className="mb-3" controlId="change-avatar">
            <Form.Label>Your Avatar</Form.Label>
            <Image src={"images/avatar/frankis.jpeg"} alt="Frankis Avatar" roundedCircle="true" width="100px" />
            <Button message="Change Avatar" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-name">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="name" placeholder="*SAMPLE USER'S NAME*" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-name">
            <Form.Label>Your Bio</Form.Label>
            <Form.Control as="textarea" placeholder="*SAMPLE USER'S BIO*" />
          </Form.Group>

          <Button message="Submit Changes" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}