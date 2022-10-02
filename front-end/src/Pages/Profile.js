import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "./Profile.scss";
import Button from '../components/Button';

export const Profile = () => {
  const [userData, setUserData] = useState([{}]);

  useEffect(() => {
    axios
      .get("/profile/api")
      .then((res) => res.data)
      // .then((data) => setUserData(data))
  }, []);

  return (
    <div className='profile'>
      <h1>*SAMPLE NAME*'s Profile</h1>
      <div className='user-info'>
      </div>
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