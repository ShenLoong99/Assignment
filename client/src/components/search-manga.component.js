import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SearchManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mangas: [],
      search: ''
    };
  }

  // user iput
	handleChange = (e) => {
		e.preventDefault();
		this.setState({ search: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.get(`find?title=${this.state.search}`)
    .then(response =>{
      if (response.data == "") {
        this.setState ({ mangas: "none" });
        return;
      }
      this.setState({ mangas: response.data })
    }).catch(err=>{
      console.log(err)
    });
  }

  render() {
    return (
      <div>
        <h3>Search Manga in Database</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Manga Name: </label>
            <input  type="text"
                required
                className="form-control"
                placeholder="Search for manga, make sure name is exactly the same in database, please wait for a few seconds to load the result"
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
          { this.state.mangas === "none" ? (<tr><td colspan="5" className="text-center">No such manga is found in database. Please make sure the name is correct and same with the record in database, or save the manga first.</td></tr>) :
            ( this.state.mangas.map((manga) => (
            <tbody key="manga.key">
            <tr>
              <td><img src={manga.posterImg} width="44px" height="67px" alt="poster"/></td>
              <td>{manga.mangaName}</td>
              <td>{manga.mangaCreatedAt.substring(0,10)}</td>
              <td>{manga.animeGenres}</td>
              <td>
                <Link className="btn btn-primary" to={"/view/" + manga._id}>View</Link>
              </td>
            </tr>
            </tbody>
          )))}
        </table>
      </div>
    )
  }
}