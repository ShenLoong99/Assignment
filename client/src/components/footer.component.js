import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <footer className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="#" className="navbar-brand" style={{pointerEvents: "none"}}>Manga & Anime API</Link>
        <div className="collpase navbar-collapse">
        </div>
        <div className="text-white">
          Created by Si Kai
        </div>
      </footer>
    );
  }
}