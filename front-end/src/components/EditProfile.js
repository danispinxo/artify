import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/button.scss';
import Image from 'react-bootstrap/Image';
import Button from "./Button";
import Form from 'react-bootstrap/Form';
import '../styles/editprofile.scss';

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
    edits.email ? editedUser.email = edits.email : editedUser.email = user.email;
    // edits.password ? editedUser.password = edits.password : editedUser.password = user.password;

    setEdits(editedUser);
  };

  const VIEW = 'VIEW';

  useEffect(() => {
    axios.put("/api/profile", edits)
      .then((all) => {
        edits.id && setMode(VIEW);
      })
  }, [edits, setMode]); 

  const submitAvatar = event => {
    event.preventDefault();
    // This part retrieves the file from the change-avatar form
    const form = event.currentTarget;
    const fileUploadInput = form.querySelector("#change-avatar");
    const fileUpload = fileUploadInput.files[0];
    
    // This part creates a FormData object, it includes 2 things: 1. text (the user.id), 2. the file
    const formData = new FormData();
    formData.append("userID", user.id);
    formData.append("avatar", fileUpload);

    // Makes put request with second arg., the form data with the above info
    axios.put("/api/profile/avatar", formData)
      .then((all) => {
        // Then once complete
        setMode(VIEW);
      });
  };

  const submitCover = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const fileUploadInput = form.querySelector("#change-cover");
    const fileUpload = fileUploadInput.files[0];
    const formData = new FormData();

    formData.append("userID", user.id);
    formData.append("cover", fileUpload);
   
    axios.put("/api/profile/cover", formData)
      .then((all) => {
        
        setMode(VIEW);
      });
  };

  const changePassword = event => {
    event.preventDefault();

    const passwordResetObj = {};
    passwordResetObj.id = user.id;
    passwordResetObj.password = event.target[0].value;

    axios.post("/password/reset/", passwordResetObj)
      .then((all) => {
        
        setMode(VIEW);
      });
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Your Profile</h1>

      <div className="edit-avatar-form">
        <Form onSubmit={submitAvatar} className="edit-form-container">
          <Form.Group className="mb-3" controlId="change-avatar">
            <h2>Edit Your Avatar</h2>
            {user.avatar_image &&
              <Image src={user.avatar_image} alt={user.first_name + user.last_name} className="edit-form-avatar-img" roundedCircle="true" />            
            }
            <Form.Control type="file" className="edit-form-control"/>
          </Form.Group>

          <Button message="Upload New Avatar" variant="primary" type="submit" />
        </Form>
      </div>

      <div className="edit-cover-form">
        <Form onSubmit={submitCover} className="edit-form-container">
          <Form.Group className="mb-3" controlId="change-cover">
            <h2>Edit Your Cover Image</h2>
            {user.cover_image && 
              <Image src={user.cover_image} alt={user.first_name + "cover image"} className="edit-form-cover-img" />
            }
            <Form.Control type="file" className="edit-form-control"/>
            <p className="recommendation">We recommend a minimum image size of 800px wide for cover images.</p>
          </Form.Group>

          <Button message="Upload New Cover" variant="primary" type="submit" />
        </Form>
      </div>

      <div className="edit-password-form">
        <Form onSubmit={changePassword} className="edit-form-container">
          <Form.Group className="mb-3" controlId="change-password">
            <h2>Change Your Password</h2>
            <Form.Label>Your New Password</Form.Label>
            <Form.Control className="edit-form-control" name="password" type="password" placeholder="Change Your Password" onChange={(event => event.preventDefault)} />
          </Form.Group>

          <Button message="Change Your Password" variant="primary" type="submit" />
        </Form>
      </div>

      <div className="edit-form-info">
        <Form onSubmit={event => event.preventDefault()} className="edit-form-info-container">
        <h2>Edit Your Profile Information</h2>
          <Form.Group className="mb-3" controlId="change-first-name">
            <Form.Label>Your First Name</Form.Label>
            <Form.Control className="edit-form-control" name="first_name" type="name" placeholder={user.first_name} onChange={(event) => userEdits.first_name = event.target.value} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-last-name">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control className="edit-form-control" name="last_name" type="name" placeholder={user.last_name} onChange={(event) => userEdits.last_name = event.target.value} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-email">
            <Form.Label>Your Email</Form.Label>
            <Form.Control className="edit-form-control" name="email" type="email" placeholder={user.email} onChange={(event) => userEdits.email = event.target.value} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="change-bio">
            <Form.Label>Your Bio</Form.Label>
            <Form.Control className="edit-form-control" as="textarea" placeholder={user.bio ? user.bio : "You have not included a bio yet."} onChange={(event) => userEdits.bio = event.target.value}/>
          </Form.Group>

          <Button message="Submit Changes" variant="primary" type="submit" onClick={ () => editProfile(userEdits, user)}/>
        </Form>
      </div>
    </div>
  )
}