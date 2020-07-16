import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ViewNewManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
        mangaName: '',
        poster: '',
        alter: '',
        created: '',
        genres: '',
        start: '',
        score: '',
        episodes: '',
        rating: '',
        synopsis: '',
        airing: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/show?title=' + this.props.match.params.mangaName)
      .then((response) => {
        this.setState({ 
          mangaName: response.data.mangaName,
          poster: response.data.posterImg,
          alter: response.data.mangaJapName,
          created: response.data.mangaCreatedAt,
          genres: response.data.animeGenres,
          start: response.data.animeStartDate,
          score: response.data.animeScore,
          episodes: response.data.animeEpisodes,
          rating: response.data.mangaRating,
          synopsis: response.data.mangaSynopsis,
          airing: response.data.animeAiring
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.get(`/add?title=${this.state.mangaName}`)
      .then(res => {
        console.log(res.data)
        alert("Insert successful!");
        window.location = "/mangaList";
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <h2>{this.state.mangaName}</h2> 
            <img src={this.state.poster} className="img-responsive" style={{width: "80%", height: "80%"}} alt="poster" />
          </div>
          <div className="col-sm-4">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Alternate Name</td>
                  <td>{this.state.alter}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{this.state.created}</td>
                </tr>
                <tr>
                  <td>Genres</td>
                  <td>{this.state.genres}</td>
                </tr>
                <tr>
                  <td>Anime Airing</td>
                  <td>{ this.state.airing }</td>
                </tr>
                <tr>
                  <td>Anime Airing Time</td>
                  <td>{this.state.start}</td>
                </tr>
                <tr>
                  <td>Manga Rating</td>
                  <td>{this.state.rating}/100</td>
                </tr>
                <tr>
                  <td>Anime Episodes</td>
                  <td>{this.state.episodes}</td>
                </tr>
                <tr>
                  <td>Anime Score</td>
                  <td>{this.state.score}/10</td>
                </tr>
                <tr>
                  <td colSpan="2">Synopsis</td>
                </tr>
                <tr>
                  <td colSpan="2">{this.state.synopsis}</td>
                </tr>
              </tbody>
            </table>
            <form onSubmit={this.onSubmit}>
              <input type="submit" value="Insert" className="btn btn-primary mr-5" />
              <Link to={"/insert"} className="btn btn-primary">Back</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}