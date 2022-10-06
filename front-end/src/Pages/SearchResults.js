import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import '../styles/searchResults.scss'
import axios from 'axios';

export default function SearchResults() {
const [searchParams] = useSearchParams();
const [artResult, setArtResults] = useState([]);
  
const searchInput = searchParams.get('search') ;
  
  useEffect(() => {
    axios.post('/api/search', {searchInput})
    .then((response) => {
      setArtResults(response.data)
    })
    .catch((err) => {
    })
  }, [searchInput])

  return (
    <div>
    { artResult.length && <div className="search-artwork-container">
      {artResult.map((artwork, i) => 
        <div className="search-artwork-unit" key={i}>
              <Link to={`/product/${artwork.id}`} state={artwork}>
              <img className="search-artwork-result-image" src={artwork.image} alt={artwork.image}></img>
              </Link>
              <div className="search-artwork-info">
              <h4>{artwork.name}</h4>
              <p>{artwork.description}</p>
              <p>${artwork.price_cents/100}</p>
              </div>
        </div>
      )}
    </div> }

    {!artResult.length && <h1 className="null-search">No artwork found matching your search</h1>}
    </div>

  )
}
