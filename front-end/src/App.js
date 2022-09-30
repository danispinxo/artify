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
      <h1>Contact List</h1>
      <div className="user-list">
        <ul className="list">
          {(backendData.length > 0) && backendData.map((user, i) => <li key={i}><img src={user.avatar} alt="avatar" width="100px"/> {user.name} {user.surname}: {user.email} </li>)}
        </ul>
      </div>   
    </div>
  );
}

export default App;
