import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/homepage.scss";
import { Autoplay, Pagination, Navigation } from "swiper";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CategoryItem from "../components/CategoryItem";


export const Home = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get("/homepage/api"),
      axios.get("/categories/api")
    ]).then((all) => {
      setImages(all[0].data)
      setCategories(all[1].data)
    })
  },[])

  
  return (
    <div className="homepage-container">
    <h1>LETS BUY ART!</h1>

      {images.length > 0 && (
        <Swiper
        slidesPerView={5}
        spaceBetween={5}
        slidesPerGroup={5}
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
        <SwiperSlide className="shrink" key={i}>
          <div className="artwork-container">
            <img className="artwork" src={image.image} alt={image.image} />
          </div>
        </SwiperSlide>
          ))}

        </Swiper>
      )}

      <div className="categories-container">
      {categories.map((category, i) => 
        <CategoryItem name={category.name} image={category.image} />
        )}
      </div>
    </div>
  );
};
