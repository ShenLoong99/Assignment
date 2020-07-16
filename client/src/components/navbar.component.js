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
		await fetch("/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((jsonData) => {
				console.log(jsonData);
				if (jsonData) {
					alert("Logout successful");
					window.location = "/";
				} else {
					alert("Logout failed");
					window.location = "/mangaList";
				}
			})
			.catch((error) => {
				alert("Error: " + error);
			});
	};

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
          <Link onClick={() => { if (window.confirm('Are you sure you want to logout?')) this.logout()}} className="nav-link">Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}