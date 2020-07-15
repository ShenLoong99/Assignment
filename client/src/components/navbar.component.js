import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

  componentDidMount() {
    axios.get('/checkCookie')
    .then((response) => {
      if (response.data === false) {
        document.getElementById("navbar-item-1").style.display = "none";
        document.getElementById("navbar-item-2").style.display = "none";
        document.getElementById("navbar-item-3").style.display = "none";
        document.getElementById("navbar-item-4").style.display = "none";
        document.getElementById("navbar-item-5").style.display = "none";
        document.getElementById("navbar-brand").style.pointerEvents = "none";
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  logout = async () => {
    await axios.get('/logout')
      .then((response) => {
        console.log(response.data);
        if (response.data) {  
          alert("Logout successful");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/mangaList" className="navbar-brand" id="navbar-brand">Manga & Anime API</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item" id="navbar-item-1">
          <Link to="/insert" className="nav-link">Insert new manga</Link>
          </li>
          <li className="navbar-item" id="navbar-item-2">
          <Link to="/search" className="nav-link">Search manga</Link>
          </li>
          <li className="navbar-item" id="navbar-item-3">
          <Link to="/delete" className="nav-link">Delete manga</Link>
          </li>
          <li className="navbar-item" id="navbar-item-4">
          <Link to="/viewUser" className="nav-link">Account</Link>
          </li>
          <li className="navbar-item" id="navbar-item-5">
          <Link to="/" onClick={this.logout.bind(this)} className="nav-link">Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}