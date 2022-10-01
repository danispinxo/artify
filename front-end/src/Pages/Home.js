import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/homepage.scss";
import { Pagination, Navigation } from "swiper";
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
        slidesPerView={5}
        spaceBetween={5}
        slidesPerGroup={5}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
          {images.map((image, i) => (
            <SwiperSlide className="shrink" key={i}>
              <div className="artwork-container">
              <img className="artwork" src={image.image} alt={image.image} />
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
    </>
  );
};
