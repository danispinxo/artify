import React from "react";
import '../styles/button.scss';
import Button from "./Button";

export default function ViewProfile() {
  return (
    <div className="view-profile">
      <h1>*SAMPLE NAME*'s Profile</h1>
      <div className='profile-buttons'>
        <Button message="Add to Gallery" />
        <Button message="Order History" />
        <Button message="Edit Profile" />
      </div>
      <div className="user-gallery">
        <p>This is where the user's artwork will go</p>
          {/* {(userData.length > 0) && userData.map((artwork, i) => 
          <div key={i}>
            <img src={artwork.image} alt="avatar" width="250px"/> 
            <p>"{artwork.name}" -- Price $ {artwork.price_cents / 100.00}</p>
            <p>{artwork.description}</p>
          </div>)} */}
      </div>
    </div>
  )
}