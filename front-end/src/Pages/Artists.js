import React, { useEffect, useContext } from "react";
import axios from "axios";
import "../styles/homepage.scss";
import CategoryItem from "../components/CategoryItem";
import { DataContext } from "../context/dataContext";

export default function Artists() {
  const dataState = useContext(DataContext);

  useEffect(() => {
    axios.post(`order/api/artists`)
      .then((res) => {
        console.log(res.data);
      })
  }, []);

  useEffect(() => {
    if (dataState.artworks) {
      dataState.setArtworks(dataState.artworks);
      dataState.setCategories(dataState.categories);
    }
  }, [dataState]);

  return (
    <div className="homepage-container">

      <h1>Explore All the Artify Artists</h1>
      This will be a list of all the artists.
      {/* <div className="categories-container">
        {dataState.categories.map((category, i) => (
          <CategoryItem
            key={i}
            id={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div> */}
    </div>
  );
};
