import React from "react";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "./Button";
import Form from 'react-bootstrap/Form';

export default function EditProfile({user}) {
  return (
    <div className="edit-profile">
      <h1>Edit Your Profile</h1>
      <div className="edit-form">
        <Form>
          <Form.Group className="mb-3" controlId="change-avatar">
            <Form.Label>Your Avatar</Form.Label>
            <Image src={user.avatar_image} alt={user.first_name + user.last_name} roundedCircle="true" width="100px" />
            <Button message="Change Avatar" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-first-name">
            <Form.Label>Your First Name</Form.Label>
            <Form.Control type="name" placeholder={user.first_name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-last-name">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control type="name" placeholder={user.last_name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-name">
            <Form.Label>Your Bio</Form.Label>
            <Form.Control as="textarea" placeholder={user.bio ? user.bio : "You have not included a bio yet."} />
          </Form.Group>

          <Button message="Submit Changes" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}