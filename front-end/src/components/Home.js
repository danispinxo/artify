import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => res.data)
      .then((data) => setBackendData(data));
  }, []);

  console.log(backendData);

  return (
    <div className="user=list">
      <h1>List of Artists!</h1>
      <div className="list">
        {backendData.length > 0 &&
          backendData.map((user, i) => (
            <div key={i}>
              <img src={user.avatar} alt="avatar" width="250px" />
              <p>
                {user.name} {user.surname}
              </p>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
