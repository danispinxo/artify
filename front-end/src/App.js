import './App.css';
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
      <h2>User List</h2>
      <div className="user-list">
        <ul className="list">
          {(backendData.length > 0) && backendData.map((user, i) => <li key={i}>New user: {user.surname}, {user.name} </li>)}
        </ul>
      </div>   
    </div>
  );
}

export default App;
