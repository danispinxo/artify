import { createContext, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export const DataContext = createContext({});

export function DataContextProvider(props) {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({})
  const [artResults, setArtResults] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/homepage/api"),
      axios.get("/categories/api"),
      axios.get("/api/session")
    ]).then((all) => {
      setArtworks(all[0].data)
      setCategories(all[1].data)
      setUser(all[2].data)
    })
  },[user.id])

  return (
    <DataContext.Provider value={{ 
      artworks:artworks,
      categories:categories,
      user: user,
      artResults: artResults, 
      setArtResults:setArtResults,
      setUser: setUser,
      setArtworks:setArtworks,
      setCategories:setCategories
     }}>
      {props.children}
    </DataContext.Provider>
  );
}
