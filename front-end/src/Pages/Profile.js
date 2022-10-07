import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../styles/profile.scss";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ViewProfile from '../components/ViewProfile';
import EditProfile from '../components/EditProfile';
import AddArtwork from '../components/AddArtwork';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Purchases from '../components/OrderHistory/Purchases';
import Sold from '../components/OrderHistory/Sold';

export default function Profile(props) {
  const VIEW = 'VIEW';
  const EDIT = 'EDIT';
  const ADD = 'ADD';
  const SOLD = 'SOLD';
  const PURCHASED = 'PURCHASED';

  const navigate = useNavigate()
  const { id } = useParams()
  const [userData, setUserData] = useState({})
  const [mode, setMode] = useState(VIEW)
  const [authUser, setAuthUser] = useState(false)

  useEffect(() => {
    Promise.all([
      axios.get('/api/profile',  { params: { id: id } }),
      axios.get('/profile/auth')
    ])
    .then((all) => {
      setAuthUser(all[1].data)
      setUserData(all[0].data[0])
    })
  }, [mode, id])

  if(Number(id) === authUser) {

  return (
    <div className='profile'>
      <div className='profile-header-container'>
        <div className='profile-header'>
          {userData.avatar_image && 
          <Image src={userData.avatar_image} alt={userData.first_name + " " + userData.last_name} className="profile-header-"roundedCircle="true" width="75px" />}
          <h1 onClick={() => setMode(VIEW)}>{userData.first_name} {userData.last_name}'s Profile</h1><br/>
        </div>
        <div className='profile-bio'>
          {userData.email && <p><b>Email: </b>{userData.email}</p>}
          {userData.bio && <p>{userData.bio}</p>}
        </div>
        <ButtonGroup className='profile-buttons'>
          <Button onClick={() => setMode(EDIT)}>Edit Profile</Button>
          <Button onClick={() => setMode(ADD)}>Add to Gallery</Button>
          <Button onClick={() => setMode(SOLD)}>Sold Artwork</Button>
          <Button onClick={() => setMode(PURCHASED)}>Purchased Artwork</Button>
          <Button onClick={()=> navigate("/gallery/" + userData.id)}>View Your Gallery</Button>
        </ButtonGroup>
      </div>
      
      {mode === VIEW && <ViewProfile />}
      {mode === EDIT && <EditProfile user={userData} setMode={setMode}/>}
      {mode === ADD && <AddArtwork user={userData} setMode={setMode}/>}
      {mode === PURCHASED && <Purchases user={userData} />}
      {mode === SOLD && <Sold user={userData} />}

    </div> 
  ) } else {
    return(
      <div className="profile">
        <h1 className="forbidden-access-title">FORBIDDEN ACCESS!</h1>
        <FontAwesomeIcon icon={faUserXmark} className="no-access-logo" />
        <h3 className="forbidden-access-message">You do not have permission to access this page. Please log in or register.</h3>
      </div>
    )
  }
};