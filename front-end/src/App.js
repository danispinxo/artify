import "./App.scss";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Header } from "./components/Header";
import { Gallery } from "./Pages/Gallery";
import { Profile } from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
