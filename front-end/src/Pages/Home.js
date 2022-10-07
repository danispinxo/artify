import React, { useEffect, useContext } from "react";
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
  

  useEffect(() => {
    if (dataState.artworks) {
      dataState.setArtworks(dataState.artworks);
      dataState.setCategories(dataState.categories);
    }
  }, [dataState]);

  return (
    <div className="homepage-container">
      <h1 className='home-page-title'>Explore, collect, and sell ARTs</h1>

      {dataState.artworks.length > 0 && (
        <Swiper
          slidesPerView={5}
          spaceBetween={15}
          slidesPerGroup={5}
          loop={true}
          autoplay={{
            delay: 5000,
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
          {dataState.artworks.map((artwork, i) => (
            <SwiperSlide className="shrink" key={i}>
              <div className="artwork-container">
                <Link to={`/product/${artwork.id}`} state={artwork}>
                  <img
                    className="artwork"
                    src={artwork.image}
                    alt={artwork.image}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <h1 className='home-page-title'>Browse by Category</h1>
      <div className="categories-container">
        {dataState.categories.map((category, i) => (
          <CategoryItem
            key={i}
            id={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
};
