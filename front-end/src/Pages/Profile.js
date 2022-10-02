import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "../styles/profile.scss";
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
  const [mode, setMode] = useState(HISTORY)

  useEffect(() => {
    axios
      .get("/profile/api")
      .then((res) => res.data)
      // .then((data) => setUserData(data))
  }, []);

  return (
    <div className='profile'>
      {mode === VIEW && <ViewProfile />}
      {mode === EDIT && <EditProfile />}
      {mode === ADD && <AddArtwork />}
      {mode === HISTORY && <OrderHistory />}
    </div>
  )
}