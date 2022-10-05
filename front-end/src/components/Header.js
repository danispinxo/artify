import React, { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faCartShopping, faHome } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.scss";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import { useNavigate } from "react-router";

export const Header = () => {
  const dataState = useContext(DataContext);
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search'));
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dataState.setUser({})
    axios.get('/logout')
  };
  
  //can snag info from the form here and put it as a url query and send it to another page.
  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchInput) {
     navigate(`/results?search=${searchInput}`) 
   }
  };

  const handleSearchInput = (e) => {
    const data = e.target.value
    setSearchInput(data)
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Container fluid>
        <div className="brand">
        <Navbar.Brand>
          <FontAwesomeIcon className="nav-icon" icon={faPaintBrush} />
          <Link className="text-decoration-none text-black" to="/">
            Artify
          </Link>
        </Navbar.Brand>          
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll >

            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/"
            >
              <FontAwesomeIcon icon={faHome} />
            </Nav.Link>

            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/categories"
            >
              All Categories
            </Nav.Link>

            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/artists"
            >
              All Artists
            </Nav.Link>

          </Nav>
    
          <Nav>
            <Nav.Link
              as={Link}
              to="/cart"
            >
              <FontAwesomeIcon className="nav-cart" icon={faCartShopping} />
            </Nav.Link>

            {!dataState.user.id && <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/login"
            >
              Login
            </Nav.Link>}

            {!dataState.user.id && <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/register"
            >
              Register
            </Nav.Link>}

            {dataState.user.id &&
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to={"/profile/" + dataState.user.id}
            >
             Profile 
             {/* {dataState.user.first_name} */}
            </Nav.Link>}

            {dataState.user.id && 
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/login"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>}

          </Nav>

          <form onSubmit={(e) => handleSubmit(e)} className="d-flex">
            <input onChange={(e) => handleSearchInput(e) } value={searchInput || ''} name="name" placeholder="Search" type="text"  id="form3Example4" className="form-control"/>
            <button className='button' type="submit" >Search</button>
          </form>
           
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
