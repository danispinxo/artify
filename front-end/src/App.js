import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Gallery } from "./components/Gallery";
// import Button from "./components/Button";
import { Homepage } from "./components/Homepage";

function App() {

  return (
    <div className="App"> 

      <Homepage />
     
      
    </div>
  );
}

export default App;
