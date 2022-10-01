import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { Gallery } from "./components/Gallery";

function App() {

  return (
    <div className="App"> 

      <div className="router-app">
        <Router>
          <div className="nav-bar">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/gallery" element={<Gallery />} />
            </Routes>
          </div>
        </Router>
      </div>   

    </div>
  );
}

export default App;
