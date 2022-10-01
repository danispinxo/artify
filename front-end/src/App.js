import "./App.scss";
import React from "react";
import { Home } from "./Pages/Home";
import { Header } from "./components/Header";
import { Gallery } from "./Pages/Gallery";
import { Routes, Route, BrowserRouter } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
