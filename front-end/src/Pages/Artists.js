import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import "../styles/homepage.scss";
import ArtistItem from "../components/ArtistItem";
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

  const getSampleArtwork = (user_id) => {
    for (const art of dataState.artworks) {
      if (art.user_id === user_id) {
        return art.image;
      }
    }
  };

  return (
    <div className="homepage-container">

      <h1>Explore All the Artify Artists</h1>
      <div className="categories-container">
        {users.map((artist) => (
          <ArtistItem
            key={artist.user_id}
            id={artist.user_id}
            name={artist.name + " " + artist.surname}
            image={artist.avatar}
            sample_art={getSampleArtwork(artist.user_id)}
          />
        ))}
      </div>
    </div>
  );
};
