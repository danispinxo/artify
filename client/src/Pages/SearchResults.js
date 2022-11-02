import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import '../styles/searchResults.scss'
import axios from 'axios';
import { Currency } from 'react-tender';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

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


console.log(artResult[0])
  return (
    <div>
      { artResult.length >= 1 && 
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
              <Currency value={artwork.price_cents / 100} currency="CAD" />
            </div>
          </div>
        )}
      </div> }

      {!artResult.length && 
      <div className="no-search-result-container">
      <SentimentVeryDissatisfiedIcon className="face"></SentimentVeryDissatisfiedIcon>
      <h1 className="null-search">Sorry, we couldn't find a match for "{searchInput}"</h1>
      </div>}

    </div>
  )
}
