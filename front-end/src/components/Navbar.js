import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from './Home';
import { Gallery } from './Gallery';

export const Navbar = () => {
  return (
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
  )
}
