import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "../styles/gallery.scss";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Currency } from "react-tender";
import { DataContext } from "../context/dataContext";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import "../styles/modal.scss";

export const Gallery = ({cart, setCart}) => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [userGallery, setUserGallery] = useState([]);
  const dataState = useContext(DataContext);
  const user = dataState.user; // context for current user
  const [modal, setModal] = useState(false);
  const [showPurchased, setShowPurchased] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    setIsLoading(false)
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    const name = e.target[0].value
    const email = e.target[1].value
    const message = e.target[2].value
  
    axios.post('/email', {name, email, message})
    .then((res) => {
      setIsLoading(true)
      setTimeout(() => {
        setModal(!modal)
      }, 3000)
      console.log(res.data)
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/profile`, { params: { id: id } }),
      axios.get(`/api/gallery`, { params: { id: id } }),
    ]).then((all) => {
      setUserData(all[0].data[0]);
      setUserGallery(all[1].data);

      for (const art of all[1].data) {
        setShowPurchased((prev) => [...prev, false])
      }
    });
  }, [id]);

  useEffect(() => {
    const orderInfo = {};
    orderInfo.userID = user.id;
    axios.post(`order/api/cart`, orderInfo)
      .then((res) => {
        setCart(res.data);
      })
  }, [showPurchased, setCart, user]);

  const handleAddToCart = (artwork, i) => {

    const orderInfo = {};
    orderInfo.userID = user.id;
    orderInfo.artworkID = artwork.id;
    orderInfo.price = artwork.price_cents;

    axios.put("/order/api/add", orderInfo)
    .then((all) => {
      setShowPurchased((prev) => {
        prev[i] = true; 
        return [...prev]
      })

      setTimeout(() => {
        setShowPurchased((prev) => {
          prev[i] = false; 
          return [...prev]
        })
      }, 2000)
    })

  };

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
                  <ToastContainer position={'middle-center'}>
                    <Toast show={showPurchased.length > 0 && showPurchased[i]} >
                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">Success!</strong>
                      </Toast.Header>
                      <Toast.Body>You've just added this sweet piece of art to your cart!</Toast.Body>
                    </Toast>          
                  </ToastContainer>
                  <a href={"/product/" + artwork.id}>
                    <Card.Img
                      className="card-img2"
                      variant="top"
                      src={artwork.image}
                      alt="avatar"
                    />
                   </a>
                                  
                </div>
                <Card.Body>
                  <Card.Title>{artwork.name}</Card.Title>
                  <Card.Text><Currency value={artwork.price_cents / 100.0} currency="CAD" /></Card.Text>
                  {!artwork.sold && dataState.user.id &&
                      <FontAwesomeIcon onClick={() => handleAddToCart(artwork, i)}  icon={faCartPlus} className="add-to-cart" />
                    }       

                  {artwork.sold && 
                    <div className="after"><FontAwesomeIcon icon={faTag} /> SOLD </div>
                  }

                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      <>
        <button onClick={toggleModal} className="btn-modal"> 
          Message
        </button>
        {modal && !isLoading && (
          <div className="message-modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="message-modal-content">

            <div className="modal-form-container">
             <form onSubmit={sendEmail}>
              <input className="name-input" type="text" placeholder="Name" name="name"></input>
              <br></br>
              <input className="email-input" type="email" placeholder="Email" name="email"></input>
              <br></br>
              <input className="message-input" type="text" placeholder="Message" name="message"></input>
              <br></br>
              <button className="message-submit" type="submit">Submit</button>
              
              <br></br>
             </form>
             </div>
              <button onClick={toggleModal} className="message-close-modal">
                Close
              </button> 
            </div> 
          </div>
        )}


          {modal && isLoading && (
          <div className="message-modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="message-modal-content">

            <div className="modal-form-container">
             <form onSubmit={sendEmail}>
              <input className="name-input" type="text" placeholder="Name" name="name"></input>
              <br></br>
              <input className="email-input" type="email" placeholder="Email" name="email"></input>
              <br></br>
              <input className="message-input" type="text" placeholder="Message" name="message"></input>
              <br></br>
              <button className="message-submit" type="submit">Sending <i className="fas fa-spinner fa-spin"></i></button>
              <br></br>
             </form>
             </div>
              <button onClick={toggleModal} className="message-close-modal">
                Close
              </button> 
            </div> 
          </div>
        )}    

      </>
    </div>
  );
};
