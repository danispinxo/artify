import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => res.data)
      .then((data) => setBackendData(data));
  }, []);

  console.log(backendData);

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Homes</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>

      <h1>Contact List</h1>
      <div className="user-list">
        <ul className="list">
          {backendData.length > 0 &&
            backendData.map((user, i) => (
              <li key={i}>
                <img src={user.avatar} alt="avatar" width="100px" /> {user.name}{" "}
                {user.surname}: {user.email}{" "}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
