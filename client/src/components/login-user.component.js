import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      pass: '',
      user: []
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/checkCookie')
    .then((response) => {
      if (response.data === true) {
        window.location = "/mangaList";
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  onChangePass = (e) => {
    this.setState({ pass: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    var username= this.state.username;
    var pwd = this.state.pass;
    await axios.get(`/login?user=${username}&pass=${pwd}`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {  
          alert("Login successful");
          window.location = "/mangaList";
        }
        else {
          alert("Your username or password is wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                name="username"
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
          <label>Enter your password: </label>
            <input  type="password"
                required
                className="form-control"
                name="password"
                onChange={this.onChangePass}
                />
          </div>
          <Link className="float-right" to={"/registerUser"}><small>No account? Register here!</small></Link>
          <div className="form-group">
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}