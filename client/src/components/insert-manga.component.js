import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class InsertManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mangas: [],
      search: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  // user iput
	handleChange = (e) => {
		e.preventDefault();
		this.setState({ search: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.get(`show?title=${this.state.search}`)
    .then(response =>{
      this.setState({
        mangas: [...this.state.mangas, response.data]
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <h3>Insert New Manga</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Manga Name: </label>
            <input  type="text"
                required
                className="form-control"
                placeholder="Search for manga, please wait for a few seconds to load the result"
                name="search"
                onChange={this.handleChange}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
        <table className="table" key="manga.id">
          <thead className="thead-light">
            <tr>
              <th>Poster</th>
              <th>Manga Name</th>
              <th>Created At</th>
              <th>Genres</th>
              <th>Actions</th>
            </tr>
          </thead>
          {this.state.mangas.map((manga) => (
            <tbody key="manga.key">
            <tr>
              <td><img src={manga.posterImg} width="44px" height="67px" alt="poster"/></td>
              <td>{manga.mangaName}</td>
              <td>{manga.mangaCreatedAt.substring(0,10)}</td>
              <td>{manga.animeGenres}</td>
              <td>
                <Link className="btn btn-primary" to={"/viewNewManga/" + manga.mangaName}>View</Link>
              </td>
            </tr>
            </tbody>
          ))}
        </table>
      </div>
    )
  }
}