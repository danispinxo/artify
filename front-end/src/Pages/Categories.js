import React, { useEffect, useContext } from "react";
import "../styles/homepage.scss";
import CategoryItem from "../components/CategoryItem";
import { DataContext } from "../context/dataContext";

export default function Categories() {
  const dataState = useContext(DataContext);

  useEffect(() => {
    if (dataState.artworks) {
      dataState.setArtworks(dataState.artworks);
      dataState.setCategories(dataState.categories);
    }
  }, [dataState]);

  return (
    <div className="homepage-container">

      <h1 className="categories-page-header" >Explore All the Artify Categories</h1>

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
