import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      pass1: '',
      pass2: '',
      users: []
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass1 = this.onChangePass1.bind(this);
    this.onChangePass2 = this.onChangePass2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  onChangePass1 = (e) => {
    this.setState({ pass1: e.target.value });
  }

  onChangePass2 = (e) => {
    this.setState({ pass2: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    var email = this.state.email;
    var username = this.state.username;
    var password = this.state.pass1;
    var verify;
    if (this.state.pass1 !== this.state.pass2) {
        alert("Please make sure the passwords are the same!");
    }
    await axios.get('/checkSameData?user=' + username)
        .then(result => {
            console.log(result);
            if (result.data) {
              verify = true;
            }
            else {
              verify = false;
            }
        })
        .catch((error) => {
            console.log(error);
        })
    if (verify) {
      alert("The username is used by others. Please use another username.");
    }
    else {
      axios.get(`/createUser?user=${username}&email=${email}&pass=${password}`)
      .then(response =>{
          console.log(response);
          alert("New user successfully created!");
          window.location = '/';
      }).catch(err => {
          alert(err);
      })
    }
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Enter your username: </label>
            <input  type="text"
                required
                className="form-control"
                name="username"
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
          <label>Enter your email: </label>
            <input  type="email"
                required
                className="form-control"
                name="email"
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
          <label>Enter your password: </label>
            <input  type="password"
                required
                className="form-control"
                name="password1"
                placeholder="Must contain at least 1 letter and 1 number, and must be 8 characters or longer"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
                onChange={this.onChangePass1}
                />
          </div>
          <div className="form-group">
          <label>Confirm your password: </label>
            <input  type="password"
                required
                className="form-control"
                name="password2"
                placeholder="Password must be the same with the previous"
                onChange={this.onChangePass2}
                />
          </div>
          <Link className="float-right" to={"/"}><small>Have account? Sign in here!</small></Link>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}