import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import "../styles/homepage.scss";
import CategoryItem from "../components/CategoryItem";
import { DataContext } from "../context/dataContext";

export default function Artists(props) {
  const dataState = useContext(DataContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/artists")
      .then((res) => {
        setUsers(res.data)
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
