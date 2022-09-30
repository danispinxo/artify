import './App.scss';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    axios.get("/api")
    .then(res => (res.data))
    .then(data => setBackendData(data))
  }, [])
  
 console.log(backendData)

  return (
    <div className="App"> 
      <h1>Sample Art Gallery</h1>
      <div className="list">
          {(backendData.length > 0) && backendData.map((artwork, i) => <div key={i}><img src={artwork.image} alt="avatar" width="250px"/> 
          <p>"{artwork.name}" -- Price $ {artwork.price_cents / 100.00}</p>
          <p>{artwork.description}</p>
      </div>)}
      </div>   
    </div>
  );
}

export default App;
