import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import '../styles/button.scss';
import '../styles/profile.scss';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function ViewProfile() {
  const { id } = useParams();
  const [userGallery, setUserGallery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/gallery`,  { params: { id: id } })
    .then((all) => {
      setUserGallery(all.data)
    })
  }, [id])

  const handleDelete = (artworkID) => {
    //make sure to pass this function the artwork ID
    const artworkInfo = {};
    artworkInfo.artworkID = artworkID;
    axios.post(`/api/profile/delete`, artworkInfo)
    .then((res) => {
      axios.get(`/api/gallery`,  { params: { id: id } })
        .then((all) => {
          setUserGallery(all.data)
        });
    })
  };

  const handleEdit = (artworkID) => {
    //make sure to pass this function the artwork ID
    navigate(`/product/edit?artworkID=${artworkID}`)
  }

  return (
    <div className="view-profile">
      <h1>Artworks Currently in Your Gallery</h1>
      <div className="user-gallery">
        {userGallery.map((art, index) => 
          <div key={index}>
          <Card style={{ width: '14rem' }}>
            <div className="card-image">
              <a href={"/product/" + art.id}>
              <Card.Img variant="top" src={art.image} alt={art.name}/>
              {art.sold && 
              <div className="after">
                <FontAwesomeIcon icon={faTag} />  SOLD
              </div>            
              }
              </a>
            </div>
            <Card.Body>
              <Card.Title>{art.name}</Card.Title>
              <button onClick={() => handleDelete(art.id)}>DELETE</button>
              <button onClick={() => handleEdit(art.id)}>EDIT</button>
            </Card.Body>
          </Card>
          </div>
        )}

        {userGallery.length === 0 &&
        <p>You do not currently have any artworks in your gallery.</p>
        }
      </div>
    </div>
  )
}