import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Manga & Anime API</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/insert" className="nav-link">Insert new manga</Link>
          </li>
          <li className="navbar-item">
          <Link to="/search" className="nav-link">Search manga</Link>
          </li>
          <li className="navbar-item">
          <Link to="/delete" className="nav-link">Delete manga</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}