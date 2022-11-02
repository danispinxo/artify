import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const Home = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => res.data)
      .then((data) => setBackendData(data));
  }, []);

  
  

  return (
    <div className='user=list'>
      <h1>List of Artists!</h1>
      <div className="list">
          {(backendData.length > 0) && backendData.map((user, i) => 
          <div key={i}>
            <img alt={user.surname} src={user.avatar} />
            <p>{user.name} {user.surname} : {user.email} </p>
          </div>)}
      </div>
    </div>
  )
}
