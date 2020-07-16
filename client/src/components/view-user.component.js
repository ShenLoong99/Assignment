import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios.get('/getUserData')
      .then(result => {
        console.log(result);
        this.setState({ users: result.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3>Account</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
             {this.state.users.map((user) => (
                <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
             </tr>))}
          </tbody>
        </table>
      </div>
    )
  }
}