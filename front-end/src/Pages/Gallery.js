import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import "../styles/gallery.scss";

export const Gallery = () => {
  const {id} = useParams();
  const [userData, setUserData] = useState({});
  const [userGallery, setUserGallery] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get(`/api/profile`,  { params: { id: id } }),
      axios.get(`/api/gallery`,  { params: { id: id } })
    ]).then((all) => {
      setUserData(all[0].data[0])
      setUserGallery(all[1].data)
    })
  }, [id])
  

  return (
    <div className='gallery'>
      
      <div className='profile'>
      <Image src={"/" + userData.cover_image} width={"1440px"} height= {"480px"}/>
      <div className='profile-header'> 
        <Image src={"/" + userData.avatar_image} alt={userData.first_name + " " + userData.last_name} roundedCircle="true" width="75px" />
        <h1>{userData.first_name} {userData.last_name}'s Profile</h1>
      </div>
      <div className='user-bio'>
        {userData.bio && <p>{userData.bio}</p>}
      </div>
      </div>
      
      <div className="list">
          {(userGallery.length > 0) && userGallery.map((artwork, i) => 
          <div key={i}>
            <img src={"/" + artwork.image} alt="avatar" width="250px"/> 
            <p>"{artwork.name}" -- Price $ {artwork.price_cents / 100.00}</p>
          </div>)}
      </div>
     
    </div>
  )
}
