import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    axios.get("/api")
    .then(res => res.data)
    .then(data => setBackendData(data))
  }, [])
  
 

  return (
    <div className="App"> 

      <ul className="list">
        {backendData.users && backendData.users.map((user, i) => <li key={i}>{user}</li>)}
      </ul>
       

    </div>
  );
}

export default App;
