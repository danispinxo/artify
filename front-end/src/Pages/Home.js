import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/homepage.scss";
import { Autoplay, Pagination, Navigation } from "swiper";
import CategoryItem from "../components/CategoryItem";
import { Link } from "react-router-dom";
import { DataContext } from "../context/dataContext";

export const Home = () => {
  const dataState = useContext(DataContext);
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (dataState.artworks) {
      setArtworks(dataState.artworks);
      setCategories(dataState.categories);
    }
  }, [dataState]);

  return (
    <div className="homepage-container">
      <h1>LETS BUY ART!</h1>

      {artworks.length > 0 && (
        <Swiper
          slidesPerView={5}
          spaceBetween={5}
          slidesPerGroup={5}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {artworks.map((artwork, i) => (
            <SwiperSlide className="shrink" key={i}>
              <div className="artwork-container">
                <Link to={`/product/description/${artwork.id}`} state={artwork}>
                  {" "}
                  <img
                    className="artwork"
                    src={artwork.image}
                    alt={artwork.image}
                  />{" "}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <h1>Browse by Category</h1>
      <div className="categories-container">
        {categories.map((category, i) => (
          <CategoryItem key={i} name={category.name} image={category.image} />
        ))}
      </div>
    </div>
  );
};
