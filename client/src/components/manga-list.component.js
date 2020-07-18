import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class MangaList extends Component {
  constructor(props) {
    super(props);

    this.state = {mangas: []};
  }

  // signals that the all components have rendered properly
  componentDidMount = async () => {
    await axios.get('/getAllData')
      .then(result => {
        if (result.data == "") {
          this.setState ({ mangas: "none" });
          return;
        }
        this.setState({ mangas: result.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3>Manga records in Database</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Poster</th>
              <th>Manga Name</th>
              <th>Created At</th>
              <th>Genres</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.state.mangas === "none" ? (<tr><td colspan="5" className="text-center">No mangas saved at the moment!</td></tr>) : 
            ( this.state.mangas.map((manga) => (
              <tr key={manga._id}>
                <td><img src={manga.posterImg} width="44px" height="67px" alt="poster"/></td>
                <td>{manga.mangaName}</td>
                <td>{manga.mangaCreatedAt.substring(0,10)}</td>
                <td>{manga.animeGenres}</td>
                <td>
                  <Link className="btn btn-primary" to={"/view/" + manga._id}>View</Link> <Link className="btn btn-primary" to={"/edit/" + manga._id}>Update</Link>
                </td>
              </tr> )
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}