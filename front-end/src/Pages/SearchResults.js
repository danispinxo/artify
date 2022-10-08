import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import '../styles/searchResults.scss'
import axios from 'axios';
import { Currency } from 'react-tender';

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
  console.log(artResult)
  return (
    <div>
      { artResult.length && 
      <div className="search-artwork-container">
        <h1>Search Results:</h1>
        <h3>Returned the following results for search term: <strong>"{searchInput}"</strong></h3>
        {artResult.map((artwork, i) => 
          <div className="search-artwork-unit" key={i}>
            <Link to={`/product/${artwork.id}`} state={artwork}>
              <img className="search-artwork-result-image" src={artwork.image} alt={artwork.image}></img>
            </Link>
            <div className="search-artwork-info">
              <h4>{artwork.name}</h4>
              <p>{artwork.description}</p>
              <p><Currency value={artwork.price_cents / 100} currency="CAD" /></p>
            </div>
          </div>
        )}
      </div> }

      {!artResult.length && <h1 className="null-search">No artwork found matching your search</h1>}
    </div>

  )
}
