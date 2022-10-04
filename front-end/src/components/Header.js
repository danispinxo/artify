import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.scss";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import { useNavigate } from "react-router";


export const Header = () => {
  const dataState = useContext(DataContext);
  const [searchInput, setSearchInput] = useState('');
  const [returnResult, setReturnResult] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    dataState.setUser({})
    axios.get('/logout')
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
   
    axios.post('/api/search', {searchInput})
    .then((artwork) => {
      setReturnResult(artwork.data[0])
      navigate(`/product/${artwork.data[0].id}`)
    })
    .catch(
      setReturnResult({})
      )
  }

  const handleSearchInput = (e) => {
    const data = e.target.value
    setSearchInput(data)
  }

  

  return (
    <Navbar className="navbar" expand="lg">
      <Container fluid>
        <div className="brand">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faPaintBrush} />
          <Link className="text-decoration-none text-black" to="/">
            Artify
          </Link>
        </Navbar.Brand>          
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/gallery/3"
            >
              Gallery
            </Nav.Link>

          </Nav>
          <Form className="d-flex">
            
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Nav>
            <Nav.Link
              as={Link}
              to="/cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
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
              {dataState.user.first_name}'s Profile
            </Nav.Link>
            }
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
            <input onChange={(e) => handleSearchInput(e) } value={searchInput} name="name" placeholder="Search" type="text"  id="form3Example4" className="form-control"/>
           <Button type="submit" variant="outline-success">Search</Button>
          </form>
           {/* {!returnResult.id && <p>Nothing artwork found matching your search</p>} */}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
