import { createContext, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export const DataContext = createContext({});

export function DataContextProvider(props) {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/homepage/api"),
      axios.get("/categories/api")
    ]).then((all) => {
      setArtworks(all[0].data)
      setCategories(all[1].data)
    })
  },[])

  return (
    <DataContext.Provider value={{ 
      artworks:artworks,
      categories:categories
     }}>
      {props.children}
    </DataContext.Provider>
  );
}
