import React from "react";
import "../App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

class nav extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    if(localStorage.getItem('loginAccess')!=='true'){
      return(
        <Navbar className="custom-navbar" expand="lg">
          <Container>
  <Navbar.Brand href="#home" style={{ color: '#ffffff' }}>Ticket System</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <div className="navbar-nav ml-auto">
    <a href="/login" className="nav-item nav-link" style={{ color: '#ffffff' }}>Login</a>
    <a href="/register" className="nav-item nav-link" style={{ color: '#ffffff' }}>Register</a>
  </div>
</Container>
        </Navbar>
      )
    }else{
        return(
          <Navbar className="custom-navbar" expand="lg">
         <Container>
  <Navbar.Brand href="#home" style={{ color: '#ffffff' }}>Ticket System</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <div className="navbar-nav ml-auto">
    <a href="/user" className="nav-item nav-link" style={{ color: '#ffffff' }}>Dashboard</a>
    <a onClick={() => this.Logout()} className="nav-item nav-link" style={{ color: '#ffffff' }}>Logout</a>
  </div>
</Container>
        </Navbar>
        )
      }
  }
}

export default nav;
