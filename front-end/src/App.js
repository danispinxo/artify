import "./App.scss";
import React, {useState} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DataContextProvider } from "./context/dataContext";
import { Home } from "./Pages/Home";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { Gallery } from "./Pages/Gallery";
import Profile from "./Pages/Profile";
import ProductDescription from "./Pages/ProductDescription";
import Category from "./Pages/Category";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import SearchResults from "./Pages/SearchResults";
import Categories from "./Pages/Categories";
import Artists from "./Pages/Artists";
import EditArtwork from "./Pages/EditArtwork";
import StripeContainer from "./components/StripeContainer";
import Confirmation from "./Pages/Confirmation";

function App() {
  const [cart, setCart] = useState(0);

  return (
    <DataContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header cart={cart} setCart={setCart}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:id" element={<Gallery />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/product/edit" element={<EditArtwork />} />
            <Route path="/payment" element={<StripeContainer />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </DataContextProvider>
  );
}

export default App;
