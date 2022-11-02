import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Heading() {
  const styleObj = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px',
  };
  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>React-Community</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/' style={styleObj}>
              Home
            </Link>
            <Link to='/upload' style={styleObj}>
              Upload
            </Link>
            <Link to='/login' style={styleObj}>
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
