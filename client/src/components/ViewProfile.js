import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import '../styles/button.scss';
import '../styles/profile.scss';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons';

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
    <div className="view-profile-container">
      <h1>Artworks Currently in Your Gallery</h1>
      <div className="view-profile-gallery">
        {userGallery.map((art, index) => 
          <Card className="view-profile-card" key={index}>
            <div className="view-profile-card-img">
              <a href={"/product/" + art.id}>
              <Card.Img className="view-profile-card-img-top" variant="top" src={art.image} alt={art.name}/>
              {art.sold && 
              <div className="view-profile-card-img-after">
                <FontAwesomeIcon icon={faTag} />  SOLD
              </div>
              }
              </a>
            </div>
            <Card.Body className="view-profile-card-body">
              <Card.Title>{art.name}</Card.Title>
              <div>
              <FontAwesomeIcon icon={faTrashCan} className="view-profile-card-buttons" onClick={()=> handleDelete(art.id)}/>
              <FontAwesomeIcon icon={faPenToSquare} className="view-profile-card-buttons" onClick={()=> handleEdit(art.id)}/>
              </div>
            </Card.Body>
          </Card>
          
        )}

      </div>
        {userGallery.length === 0 &&
        <p className="user-gallery-no-artwork" >You do not currently have any artworks in your gallery.</p>
        }
    </div>
  )
}