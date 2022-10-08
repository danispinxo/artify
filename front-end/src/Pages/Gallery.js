import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "../styles/gallery.scss";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCircleXmark, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Currency } from "react-tender";
import { DataContext } from "../context/dataContext";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import "../styles/modal.scss";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

export const Gallery = ({ cart, setCart }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [userGallery, setUserGallery] = useState([]);
  const dataState = useContext(DataContext);
  const user = dataState.user; // context for current user
  const [modal, setModal] = useState(false);
  const [showPurchased, setShowPurchased] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState([]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#d6a00a",
    },
  });

  const toggleModal = () => {
    setModal(!modal);
    setIsLoading(false);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    axios.post("/email", { name, email, message }).then((res) => {
      setIsLoading(true);
      setTimeout(() => {
        setModal(!modal);
      }, 3000);
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/profile`, { params: { id: id } }),
      axios.get(`/api/gallery`, { params: { id: id } }),
    ]).then((all) => {
      setUserData(all[0].data[0]);
      setUserGallery(all[1].data);

      for (let i = 0; i <= all[1].data.length; i++) {
        setShowPurchased((prev) => [...prev, false]);
      }
    });
  }, [id]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/profile`, { params: { id: id } }),
      axios.get(`/api/gallery`, { params: { id: id } }),
    ]).then((all) => {
      setUserData(all[0].data[0]);
      setUserGallery(all[1].data);
    });
  }, [id, showPurchased]);

  useEffect(() => {
    const orderInfo = {};
    orderInfo.userID = user.id;
    axios.post("/order/api/cart", orderInfo).then((res) => {
      setCart(res.data);
    });
  }, [showPurchased, setCart, user]);

  useEffect(() => {
    axios.post("/api/ratings/get", { id: id})
      .then((res) => {
        let total = 0;
        for (const rating of res.data) {
          total += Number(rating.rating);
        }
        setRating(total / res.data.length);

      })
  }, [id]);

  const handleAddToCart = (artwork, i) => {
    if (!user.id) {alert("You can't add to cart without signing in!");}

    const orderInfo = {};
    orderInfo.userID = user.id;
    orderInfo.artworkID = artwork.id;
    orderInfo.price = artwork.price_cents;

    Promise.all([
      axios.put("/order/api/add", orderInfo),
      axios.post("/api/product/add-to-cart", {artwork_id: artwork.id})
    ])
    .then((all) => {
      setShowPurchased((prev) => {
        prev[i] = true;
        return [...prev];
      });

      setTimeout(() => {
        setShowPurchased((prev) => {
          prev[i] = false; 
          return [...prev]
        })
      }, 1000)
    })

  };

  return (
    <div className="gallery">
      <div className="profile-gallery">
        <Image className="profile-gallery-cover-image" src={userData.cover_image} fluid={true}/>
        <div className="profile-gallery-header">
          <Image
                src={userData.avatar_image}
                alt={userData.first_name + " " + userData.last_name}
                roundedCircle="true"
                width="150px"
                className="profile-gallery-avatar"
            />
          <div className="user-name">
            <h2>
              {userData.first_name} {userData.last_name}
            </h2>
            <button onClick={toggleModal} className="send-message-btn">
              Message This Artist
            </button>
          </div>

        <div className="user-bio">
          {userData.bio && <p>{userData.bio}</p>}
          <StyledRating name="simple-controlled" value={rating} readOnly />
        </div>

      </div>

        {/* Modal stuff */}
        <div>
          {modal && !isLoading && (
            <div className="message-modal">
              <div className="overlay" onClick={toggleModal}></div>
              <div className="message-modal-content">
                <div className="message-modal-head-cross">
                  <h4>Send this Artist an Email</h4>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    onClick={toggleModal}
                    className="message-close-modal"
                  />
                </div>

                <div className="modal-form-container">
                  <form onSubmit={sendEmail} className="modal-form">
                    <label className="modal-form-label">Your name:</label>
                    <br />
                    <input
                      className="name-email-input"
                      type="text"
                      placeholder="Name"
                      name="name"
                    />
                    <br />
                    <label className="modal-form-label">Your email:</label>
                    <br />
                    <input
                      className="name-email-input"
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                    <br />
                    <label className="modal-form-label">Your message:</label>
                    <br />
                    <textarea
                      className="message-input"
                      type="text"
                      placeholder="Message"
                      name="message"
                    />
                    <br />
                    <button className="message-submit" type="submit">
                      Submit
                    </button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          )}

          {modal && isLoading && (
            <div className="message-modal">
              <div className="overlay" onClick={toggleModal}></div>
              <div className="message-modal-content">
                <div className="modal-form-container">
                  <form onSubmit={sendEmail}>
                    <button className="message-submit" type="submit">
                      Sending <i className="fas fa-spinner fa-spin"></i>
                    </button>
                    <br />
                  </form>
                </div>
                <button onClick={toggleModal} className="message-close-modal">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        
      </div>

      <div className="Gallery-list">
        {userGallery.length > 0 &&
          userGallery.map((artwork, i) => (
            
              <Card className="Gallery-list-item" key={i}>
                <div className="card-image2">
                  <ToastContainer className="toast-container" position={'middle-center'}>
                    <Toast show={showPurchased.length > 0 && showPurchased[i]} >
                      <Toast.Body className="toast-body">Added To Cart</Toast.Body>
                    </Toast>          
                  </ToastContainer>
                  <a href={"/product/" + artwork.id}>
                    <Card.Img
                      className="card-img2"
                      variant="top"
                      src={artwork.image}
                      alt="avatar"
                      fluid={true}
                    />
                  </a>
                </div>
                <Card.Body>
                  <Card.Title>{artwork.name}</Card.Title>
                  <Card.Text>
                    <Currency
                      value={artwork.price_cents / 100.0}
                      currency="CAD"
                    />
                  </Card.Text>
                  {!artwork.sold && !artwork.in_cart && user.id && (
                    <h5
                      className="add-to-cart"
                      onClick={() => handleAddToCart(artwork, i)}
                    >
                      Add to cart
                    </h5>
                  )}

                  {artwork.sold && (
                    <div className="after">
                      <FontAwesomeIcon icon={faTag} /> SOLD{" "}
                    </div>
                  )}

                  {artwork.in_cart && (
                    <div className="in-cart">
                      <FontAwesomeIcon icon={faCartArrowDown} /> IN CART{" "}
                    </div>
                  )}
                </Card.Body>
              </Card>
            
          ))}
      </div>
    </div>
  );
};
