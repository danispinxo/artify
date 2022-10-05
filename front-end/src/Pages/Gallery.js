import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "../styles/gallery.scss";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Currency } from 'react-tender';
import { useNavigate } from "react-router";
import { DataContext } from "../context/dataContext";


export const Gallery = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [userGallery, setUserGallery] = useState([]);
  const navigate = useNavigate();
  const dataState = useContext(DataContext);
  const user = dataState.user; // context for current user


  useEffect(() => {
    Promise.all([
      axios.get(`/api/profile`, { params: { id: id } }),
      axios.get(`/api/gallery`, { params: { id: id } }),
    ]).then((all) => {
      setUserData(all[0].data[0]);
      setUserGallery(all[1].data);
    });
  }, [id]);



  const handleAddToCart = (artwork) => {
    console.log(artwork ,'artwork')
    // event.preventDefault();

    const orderInfo = {};
    orderInfo.userID = user.id;
    orderInfo.artworkID = artwork.id;
    orderInfo.price = artwork.price_cents;

    axios.put("/order/api/add", orderInfo)
    .then((all) => {
      // figure out how to navigate to cart after successful response, or render error if unsuccessful
    });
  }


  return (
    <div className="gallery">
      <div className="profile-gallery">
        <div className="profile-cover-gallery">
          <Image className="image" src={userData.cover_image} />
        </div>

        <div className="profile-header-gallery">
          <Image
            src={userData.avatar_image}
            alt={userData.first_name + " " + userData.last_name}
            roundedCircle="true"
            width="150px"
          />
        </div>
        <div className="user-name">
          <h2>
            {userData.first_name} {userData.last_name}
          </h2>
        </div>

        <div className="user-bio">{userData.bio && <p>{userData.bio}</p>}</div>
      </div>

      <div className="list">
        {userGallery.length > 0 &&
          userGallery.map((artwork, i) => (
            <div className="list-item" key={i}>
              <Card>
                <div className="card-image2">
                  <a href={"/product/" + artwork.id}>
                    <Card.Img
                      className="card-img2"
                      variant="top"
                      src={artwork.image}
                      alt="avatar"
                    />
                   </a>

                    {artwork.sold && 
                    <div className="after"  >
                      <FontAwesomeIcon icon={faTag} />  SOLD
                    </div>            
                    }
                   
                 
                </div>
                <Card.Body>
                  <Card.Title>{artwork.name}</Card.Title>
                  <Card.Text><Currency value={artwork.price_cents / 100.0} currency="CAD" /></Card.Text>

                  {!artwork.sold && 
                    <div className="add-to-cart">
                      <FontAwesomeIcon onClick={() => handleAddToCart(artwork)}  icon={faCartPlus} />
                    </div>            
                    }

                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};
