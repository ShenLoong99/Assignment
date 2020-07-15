import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ViewManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mangas: []
    };
  }

  componentDidMount() {
    axios.get('/find?id=' + this.props.match.params.id)
      .then((response) => {
        this.setState({ 
          mangas: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    var {mangas} = this.state;
    return (
      <div>
      {mangas.map((manga) => (
        <div className="row" key="manga.key">
          <div className="col-sm-8">
            <h2>{manga.mangaName}</h2> 
            <img src={manga.posterImg} className="img-responsive" style={{width: "80%", height: "80%"}} alt="poster" />
          </div>
          <div className="col-sm-4">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Alternate Name</td>
                  <td>{manga.mangaJapName}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{manga.mangaCreatedAt}</td>
                </tr>
                <tr>
                  <td>Genres</td>
                  <td>{manga.animeGenres}</td>
                </tr>
                <tr>
                  <td>Anime Airing</td>
                  <td>{ String(manga.animeAiring) }</td>
                </tr>
                <tr>
                  <td>Anime Airing Time</td>
                  <td>{manga.animeStartDate}</td>
                </tr>
                <tr>
                  <td>Manga Rating</td>
                  <td>{manga.mangaRating}/100</td>
                </tr>
                <tr>
                  <td>Anime Episodes</td>
                  <td>{manga.animeEpisodes}</td>
                </tr>
                <tr>
                  <td>Anime Score</td>
                  <td>{manga.animeScore}/10</td>
                </tr>
                <tr>
                  <td colspan="2">Synopsis</td>
                </tr>
                <tr>
                  <td colspan="2">{manga.mangaSynopsis}</td>
                </tr>
              </tbody>
            </table>
            <Link to={"/edit/" + manga._id} className="btn btn-primary mr-5">Update</Link> 
            <Link to={"/mangaList"} className="btn btn-primary">Back to List</Link>
          </div>
        </div>
        ))}
      </div>
    )
  }
}