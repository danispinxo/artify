import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/homepage.scss";

import { Pagination, Navigation } from "swiper";

export const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/homepage")
      .then((res) => res.data)
      .then((data) => setImages(data));
  }, []);

  return (
    <>
      {images.length > 0 && (
        <Swiper
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={3}
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
            <SwiperSlide key={i}>
              <img className="artwork" src={image.image} alt={image.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
