import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import DeleteMovie from './components/DeleteMovie';

import Home from './components/Home';

//
function App() {

  return (
    <Router>
      
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">React Client For Streaming App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>

              <Nav.Link as={Link} to="/addmovie">Create Movie</Nav.Link>
              <Nav.Link as={Link} to="/movielist">Movie List</Nav.Link>
              {/* <Nav.Link as={Link} to="/deletemovie">Delete Movie</Nav.Link> */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} /> 
          <Route path="movielist" element={<MovieList />} />
          <Route path="addmovie" element={<AddMovie />} />
          <Route path="editmovie/:id" element={<EditMovie />} />
          <Route path="deletemovie" element={<DeleteMovie />} />
        </Routes>
      </div>
    </Router>
  );
}
//
export default App;