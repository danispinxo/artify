import "./App.scss";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Header } from "./components/Header";
import { Gallery } from "./Pages/Gallery";
import Profile from "./Pages/Profile";
import { DataContextProvider } from "./context/dataContext";
import ProductDescription from "./Pages/ProductDescription";
import Category from "./Pages/Category";
import Login from "./Pages/Login";
import Register from "./Pages/Register";


function App() {
  
  return (
    <DataContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:id" element={<Gallery />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataContextProvider>
  );
}

export default App;

//multiple match route
