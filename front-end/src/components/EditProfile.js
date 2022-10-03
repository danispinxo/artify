import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "./Button";
import Form from 'react-bootstrap/Form';

export default function EditProfile({setMode, user}) {

  const [edits, setEdits] = useState({});
  const userEdits = {};

  const editProfile = (edits, user) => {
    const editedUser = {};
    // this creates an edited user to submit with the put request, either with the old or the new information
    editedUser.id = user.id;
    edits.first_name ? editedUser.first_name = edits.first_name : editedUser.first_name = user.first_name;
    edits.last_name ? editedUser.last_name = edits.last_name : editedUser.last_name = user.last_name;
    edits.bio ? editedUser.bio = edits.bio : editedUser.bio = user.bio;

    setEdits(editedUser);
  };

  const VIEW = 'VIEW';

  useEffect(() => {
    axios.put("/api/profile", edits)
      .then((all) => {
        edits.id && setMode(VIEW);
      })
  }, [edits, setMode]); 


  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const fileUploadInput = form.querySelector("#change-avatar");
    const fileUpload = fileUploadInput.files[0];
    const formData = new FormData();
    
    formData.append("userID", user.id);
    formData.append("avatar", fileUpload);

    axios.put("/api/profile/avatar", formData);
  };

  return (
    <div className="edit-profile">
      <h1>Edit Your Profile</h1>
      <div className="edit-avatar-form">

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="change-avatar">
            <Form.Label>Edit Your Avatar</Form.Label>
            <Image src={"/" + user.avatar_image} alt={user.first_name + user.last_name} roundedCircle="true" width="100px" />
            <Form.Control type="file" />
          </Form.Group>

          <Button message="Upload New Avatar" variant="primary" type="submit" />
        </Form>

      </div>
      <div className="edit-form">
        <Form onSubmit={event => event.preventDefault()}>

          <Form.Group className="mb-3" controlId="change-first-name">
            <Form.Label>Your First Name</Form.Label>
            <Form.Control name="first_name" type="name" placeholder={user.first_name} onChange={(event) => userEdits.first_name = event.target.value} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-last-name">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control name="last_name" type="name" placeholder={user.last_name} onChange={(event) => userEdits.last_name = event.target.value} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-bio">
            <Form.Label>Your Bio</Form.Label>
            <Form.Control as="textarea" placeholder={user.bio ? user.bio : "You have not included a bio yet."} onChange={(event) => userEdits.bio = event.target.value}/>
          </Form.Group>

          <Button message="Submit Changes" variant="primary" type="submit" onClick={ () => editProfile(userEdits, user)}/>
        </Form>
      </div>
    </div>
  )
}