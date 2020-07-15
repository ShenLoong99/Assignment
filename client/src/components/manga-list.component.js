import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Manga = props => (
  <tr>
    <td><img src={props.manga.posterImg} width="44px" height="67px" alt="poster"/></td>
    <td>{props.manga.mangaName}</td>
    <td>{props.manga.mangaCreatedAt.substring(0,10)}</td>
    <td>{props.manga.animeGenres}</td>
    <td>
      <Link className="btn btn-primary" to={"/view/" + props.manga._id}>View</Link> <Link className="btn btn-primary" to={"/edit/" + props.manga._id}>Update</Link>
    </td>
  </tr>
)

export default class MangaList extends Component {
  constructor(props) {
    super(props);

    this.state = {mangas: []};
  }

  async componentDidMount() {
    await axios.get('/getAllData')
      .then(result => {
        console.log(result.data);
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

  mangaList() {
    return this.state.mangas.map(currentmanga => {
      return <Manga manga={currentmanga}/>;
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
            { this.state.mangas === "none" ? (<tr><td colspan="5" className="text-center">No mangas saved at the moment!</td></tr>) : ( this.mangaList()) }
          </tbody>
        </table>
      </div>
    )
  }
}