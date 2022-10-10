import React, { useEffect, useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/homepage.scss";
import { Autoplay, Pagination, Navigation } from "swiper";
import CategoryItem from "../components/CategoryItem";
import { Link } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

export default function Home() {
  const dataState = useContext(DataContext);
  const [topRatingsUsers, setTopRatingsUsers] = useState([]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#d6a00a",
    }
  });

  useEffect(() => {
    if (dataState.artworks) {
      dataState.setArtworks(dataState.artworks);
      dataState.setCategories(dataState.categories);
    }
    axios.get("/api/topratings")
      .then((res) => {
        setTopRatingsUsers(res.data);
      });
  }, [dataState]);

  return (
    <div className="homepage-container">
      <h1 className="home-page-title">Explore, collect, and sell ARTs</h1>

      {dataState.artworks.length > 0 && (
        <Swiper
          slidesPerView={4}
          spaceBetween={12}
          slidesPerGroup={4}
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
          className="mySwiper-multi"
        >
          {dataState.artworks.map((artwork, i) => (
            <SwiperSlide className="swiper-slide-multi" key={i}>
              <div className="artwork-container">
                <Link
                  className="home-page-artwork"
                  to={`/product/${artwork.id}`}
                  state={artwork}
                >
                  <img
                    className="home-page-artwork"
                    src={artwork.image}
                    alt={artwork.image}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="toprating-container">
        <Table striped bordered hover className="home-page-top-table">
          <thead>
            <tr>
              <th className="home-page-top-heading">Top Artists</th>
            </tr>
          </thead>
          <tbody>
            {topRatingsUsers.map((topUser, i) => (
              <tr key={i} className="home-page-top-tr">
                <td className="home-page-top-td">
                  <Link to={`/gallery/${topUser.user_id}`}>
                    <Image
                      className="home-page-top-img"
                      src={topUser.avatarimage}
                      fluid={true}
                    />
                  </Link>
                </td>
                <td className="home-page-top-td-name">
                  {topUser.firstname + " " + topUser.lastname}
                </td>
                <td className="home-page-top-td-name">
                  <StyledRating
                    name="simple-controlled"
                    value={topUser.rating}
                    readOnly
                    className="rating-starts"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {dataState.artworks.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            slidesPerGroup={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loopFillGroupWithBlank={false}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination]}
            className="mySwiper-single"
          >
            {dataState.artworks.map((artwork, i) => (
              <SwiperSlide className="swiper-slide-single" key={i}>
                <div className="artwork-container-single">
                  <Link
                    className="home-page-artwork-single"
                    to={`/product/${artwork.id}`}
                    state={artwork}
                  >
                    <img
                      className="home-page-artwork-single"
                      src={artwork.image}
                      alt={artwork.image}
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>

      <h1 className="home-page-title">Browse by Category</h1>
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
