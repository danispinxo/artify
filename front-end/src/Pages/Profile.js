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

  const [userData, setUserData] = useState({});
  const [userGallery, setUserGallery] = useState([])
  const [mode, setMode] = useState(VIEW)

  useEffect(() => {
    Promise.all([
      axios.get("/profile/api"),
      axios.get("/gallery/api")
    ]).then((all) => {
      setUserData(all[0].data[0])
      setUserGallery(all[1].data)
    })
  },[mode])

  return (
    <div className='profile'>
      <div className='profile-header'>
        <Image src={userData.avatar_image} alt={userData.first_name + " " + userData.last_name} roundedCircle="true" width="75px" />
        <h1>{userData.first_name} {userData.last_name}'s Profile</h1>
      </div>
      <div className='user-bio'>
        {userData.bio && <p>{userData.bio}</p>}
      </div>
      <div className='profile-buttons'>
        <Button message="Add to Gallery" onClick={() => setMode(ADD)}/>
        <Button message="Order History" onClick={() => setMode(HISTORY)}/>
        <Button message="Edit Profile" onClick={() => setMode(EDIT)}/>
      </div>
      {mode === VIEW && <ViewProfile gallery={userGallery}/>}
      {mode === EDIT && <EditProfile user={userData} setMode={setMode}/>}
      {mode === ADD && <AddArtwork />}
      {mode === HISTORY && <OrderHistory />}
    </div>
  )
}