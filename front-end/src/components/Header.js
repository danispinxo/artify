import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.scss";


export const Header = () => {
  return (
    <Navbar className="navbar" expand="lg">
      <Container fluid>
        <div className="brand">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faPaintBrush} />
          <Link id="nav-logo" className="text-decoration-none text-black" to="/">
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
              to="/gallery"
            >
              Gallery
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/profile"
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/login"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="text-decoration-none text-black"
              to="/register"
            >
              Register
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
