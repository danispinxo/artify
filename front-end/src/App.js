import "./App.scss";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Header } from "./components/Header";
import { Gallery } from "./Pages/Gallery";
import { Profile } from "./Pages/Profile";
import { DataContextProvider } from "./context/dataContext";
import Product_description from "./Pages/Product_description";
import Category from "./Pages/Category";

function App() {
  return (
    <DataContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/product/:id"    
              element={<Product_description />}
            />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataContextProvider>
  );
}

export default App;

//multiple match route
