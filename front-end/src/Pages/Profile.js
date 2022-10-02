import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "../styles/profile.scss";
import Image from 'react-bootstrap/Image';
import Button from '../components/Button';
import ViewProfile from '../components/ViewProfile';
import EditProfile from '../components/EditProfile';
import AddArtwork from '../components/AddArtwork';
import OrderHistory from '../components/OrderHistory';

export const Profile = () => {
  const VIEW = 'VIEW';
  const EDIT = 'EDIT';
  const ADD = 'ADD';
  const HISTORY = 'HISTORY';

  const [userData, setUserData] = useState([{}]);
  const [mode, setMode] = useState(VIEW)

  useEffect(() => {
    axios
      .get("/profile/api")
      .then((res) => res.data)
      .then((data) => setUserData(data))
  }, []);

  return (
    <div className='profile'>
      <div className='profile-header'>
      <Image src={"images/avatar/frankis.jpeg"} alt="Frankis Avatar" roundedCircle="true" width="75px" />
      <h1>Frankis's Profile</h1>
      </div>
      <div className='profile-buttons'>
        <Button message="Add to Gallery" onClick={() => setMode(ADD)}/>
        <Button message="Order History" onClick={() => setMode(HISTORY)}/>
        <Button message="Edit Profile" onClick={() => setMode(EDIT)}/>
      </div>
      {mode === VIEW && <ViewProfile />}
      {mode === EDIT && <EditProfile />}
      {mode === ADD && <AddArtwork />}
      {mode === HISTORY && <OrderHistory />}
    </div>
  )
}