import React from 'react';
import {Home} from "../Pages/Home";
import { Header } from "./Header";
import { Gallery } from "../Pages/Gallery";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}
