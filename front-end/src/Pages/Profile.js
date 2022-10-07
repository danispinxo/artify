import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../styles/profile.scss";
import Image from 'react-bootstrap/Image';
import Button from '../components/Button';
import ViewProfile from '../components/ViewProfile';
import EditProfile from '../components/EditProfile';
import AddArtwork from '../components/AddArtwork';
import OrderHistory from '../components/OrderHistory';
import { useNavigate } from 'react-router';

export default function Profile(props) {
  const VIEW = 'VIEW';
  const EDIT = 'EDIT';
  const ADD = 'ADD';
  const HISTORY = 'HISTORY';
  const navigate = useNavigate()
  const { id } = useParams()
  const [userData, setUserData] = useState({})
  const [mode, setMode] = useState(VIEW)
  const [authUser, setAuthUser] = useState(false)

  useEffect(() => {
    Promise.all(
      [
        axios.get(`/api/profile`,  { params: { id: id } }),
        axios.get('/profile/auth')
    ])
    .then((all) => {
      setAuthUser(all[1].data)
      setUserData(all[0].data[0])
    })
  }, [mode, id])

  console.log(Number(id), authUser)
  

  if(Number(id) === authUser) {
  return (
      <div className='profile'>
      <div className='profile-header-container'>
      <div className='profile-header'>
        {userData.avatar_image && 
          <Image src={userData.avatar_image} alt={userData.first_name + " " + userData.last_name} className="profile-header-"roundedCircle="true" width="75px" />        
        }
        <h1 onClick={() => setMode(VIEW)}>{userData.first_name} {userData.last_name}'s Profile</h1><br/>
      </div>
      <div className='profile-bio'>
        {userData.email && <p><b>Email: </b>{userData.email}</p>}
        {userData.bio && <p>{userData.bio}</p>}
      </div>
      <div className='profile-buttons'>
        <Button message="Edit Profile" onClick={() => setMode(EDIT)}/>
        <Button message="Order History" onClick={() => setMode(HISTORY)}/>
        <Button message="Add to Gallery" onClick={() => setMode(ADD)}/>
        <Button message="View Your Gallery"  onClick={()=> navigate("/gallery/" + userData.id)}/>
      </div>
      </div>
      {mode === VIEW && <ViewProfile />}
      {mode === EDIT && <EditProfile user={userData} setMode={setMode}/>}
      {mode === ADD && <AddArtwork user={userData} setMode={setMode}/>}
      {mode === HISTORY && <OrderHistory />}
    </div> 
  ) } else {
    return(
      <div>
        <h1>FORBIDDEN ACCESS! PLEASE LOG IN.</h1>
        <h1>FORBIDDEN ACCESS! PLEASE LOG IN.</h1>
        <h1>FORBIDDEN ACCESS! PLEASE LOG IN.</h1>
        <h1>FORBIDDEN ACCESS! PLEASE LOG IN.</h1>
        <h1>FORBIDDEN ACCESS! PLEASE LOG IN.</h1>
        <h1>FORBIDDEN ACCESS! PLEASE LOG IN.</h1>
      </div>
    )
  }
};