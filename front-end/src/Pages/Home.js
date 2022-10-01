import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/homepage.scss";
import { Autoplay, Pagination, Navigation } from "swiper";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export const Home = () => {
  const [images, setImages] = useState([]);
  const [key, setKey] = useState('home');

  useEffect(() => {
    axios
      .get("/homepage")
      .then((res) => res.data)
      .then((data) => setImages(data));
  }, []);

  return (
    <>
    <h1>LETS BUY ART!</h1>
      {images.length > 0 && (
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={4}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <img className="artwork" src={image.image} alt={image.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {images.length > 0 && (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
    
        </Tab>
        <Tab eventKey="profile" title="Profile">
          
        </Tab>
        <Tab eventKey="contact" title="Contact">
  
        </Tab>
      </Tabs>
      )}
    </>
  );
};
