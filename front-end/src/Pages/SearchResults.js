import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from "../context/dataContext";
import { Link } from "react-router-dom";
import '../styles/searchResults.scss'

export default function SearchResults() {
  const dataState = useContext(DataContext);
  const [artworkList, setArtworkList] = useState([])

  const searchedArtwork = dataState.artResults  
  
  useEffect(() => {
    setArtworkList(prev => ([...searchedArtwork]))
  }, [])

  console.log(artworkList, 'fdsafdsfdsafsad')
  return (
    <div>
    { artworkList.length && <div className="search-artwork-container">
      {searchedArtwork.map((artwork, i) => 
        <div className="search-artwork-unit" key={i}>
              <Link to={`/product/${artwork.id}`} state={artwork}>
              <img src={artwork.image}></img>
              </Link>
              <div className="search-artwork-info">
              <p>{artwork.name}</p>
              <p>{artwork.description}</p>
              <p>${artwork.price_cents/100}</p>
              </div>
        </div>
      )}
    </div> }

    {!artworkList.length && <h1 className="null-search">No artwork found matching your search</h1>}
    </div>

  )
}
