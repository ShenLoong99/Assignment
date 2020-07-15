import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mangas: [],
      id: '',
      loading1: false,
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

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePoster = this.onChangePoster.bind(this);
    this.onChangeAlter = this.onChangeAlter.bind(this);
    this.onChangeCreated = this.onChangeCreated.bind(this);
    this.onChangeGenres = this.onChangeGenres.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onChangeEpisodes = this.onChangeEpisodes.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
    this.onChangeAiring = this.onChangeAiring.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/find?id=' + this.props.match.params.id)
      .then((response) => {
        this.setState({ 
          id: response.data[0]._id,
          mangaName: response.data[0].mangaName,
          poster: response.data[0].posterImg,
          alter: response.data[0].mangaJapName,
          created: response.data[0].mangaCreatedAt,
          genres: response.data[0].animeGenres,
          start: response.data[0].animeStartDate,
          score: response.data[0].animeScore,
          episodes: response.data[0].animeEpisodes,
          rating: response.data[0].mangaRating,
          synopsis: response.data[0].mangaSynopsis,
          airing: response.data[0].animeAiring
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName = (e) => {
		this.setState({ mangaName: e.target.value });
  }

  onChangePoster = (e) => {
		this.setState({ poster: e.target.value });
  }

  onChangeAlter = (e) => {
		this.setState({ alter: e.target.value });
  }

  onChangeCreated = (e) => {
		this.setState({ created: e.target.value });
  }

  onChangeGenres = (e) => {
		this.setState({ genres: e.target.value });
  }

  onChangeStart = (e) => {
		this.setState({ start: e.target.value });
  }

  onChangeRating = (e) => {
		this.setState({ rating: e.target.value });
  }

  onChangeEpisodes = (e) => {
    this.setState({ episodes: e.target.value });
  }

  onChangeScore = (e) => {
		this.setState({ score: e.target.value });
  }

  onChangeSynopsis = (e) => {
    this.setState({ synopsis: e.target.value });
  }

  onChangeAiring = (e) => {
    this.setState({ airing: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    var id = this.props.match.params.id;
    var mangaData = [];
    var mangaAtt = [];

    mangaData[0] = this.state.mangaName; mangaAtt[0] = 'mangaName';
    mangaData[1] = this.state.poster; mangaAtt[1] = 'poster';
    mangaData[2] = this.state.alter; mangaAtt[2] = 'alter';
    mangaData[3] = this.state.created; mangaAtt[3] = 'created';
    mangaData[4] = this.state.genres; mangaAtt[4] = 'genres';
    mangaData[5] = this.state.start; mangaAtt[5] = 'start';
    mangaData[6] = this.state.score; mangaAtt[6] = 'score';
    mangaData[7] = this.state.episodes; mangaAtt[7] = 'episodes';
    mangaData[8] = this.state.rating; mangaAtt[8] = 'rating';
    mangaData[9] = this.state.synopsis; mangaAtt[9] = 'synopsis';
    mangaData[10] = this.state.airing; mangaAtt[10] = 'airing';

    for (var i = 0; i < mangaData.length; i++) {
      console.log(mangaAtt[i] + mangaData[i]);
      axios.get('/update?id=' + id + '&att=' + mangaAtt[i] + '&edit=' + mangaData[i])
      .then(res => console.log(res.data));
    }
    window.location = '/view/' + id;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <div className="row" key="manga.key">
          <div className="col-sm-8">
          <input  type="text" className="form-control" name="name" onChange={this.onChangeName} value={this.state.mangaName} /><br/>
            <input  type="text" className="form-control" name="poster" onChange={this.onChangePoster} value={this.state.poster} /><br/>
            <img src={this.state.poster} className="img-responsive" style={{width: "80%", height: "80%"}} alt="poster" />
          </div>
            <div className="col-sm-4">
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>Alternate Name</td>
                    <td><input type="text" className="form-control" name="alter-name" onChange={this.onChangeAlter} value={this.state.alter} /></td>
                  </tr>
                  <tr>
                    <td>Created At</td>
                    <td><input type="text" className="form-control" name="createdAt" onChange={this.onChangeCreated} value={this.state.created} /></td>
                  </tr>
                  <tr>
                    <td>Genres</td>
                    <td><input type="text" className="form-control" name="genres" onChange={this.onChangeGenres} value={this.state.genres} /></td>
                  </tr>
                  <tr>
                    <td>Anime Airing</td>
                    <td>
                      <select required
                          className="form-control"
                          value={this.state.airing}
                          onChange={this.onChangeAiring}>
                            <option 
                                key="false"
                                value="false">False
                            </option>
                            <option 
                                key="true"
                                value="true">True
                            </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Anime Airing Date</td>
                    <td><input type="text" className="form-control" name="start-date" onChange={this.onChangeStart} value={this.state.start} /></td>
                  </tr>
                  <tr>
                    <td>Manga Rating</td>
                    <td><input type="text" pattern="^(?!0?0\.00$)\d{1,2}\.\d{2}$" maxLength="5" placeholder="No < 100, two deci" className="form-control" name="rating" onChange={this.onChangeRating} value={this.state.rating} />/100</td>
                  </tr>
                  <tr>
                    <td>Anime Episodes</td>
                    <td><input type="text" pattern="^[0-9]+$" maxLength="4" placeholder="Numbers only" className="form-control" name="episodes" onChange={this.onChangeEpisodes} value={this.state.episodes} /></td>
                  </tr>
                  <tr>
                    <td>Anime Score</td>
                    <td><input type="text" pattern="^(10|\d)(\.\d{1,2})?$" maxLength="4" placeholder="No < 10, two deci" className="form-control" name="score" onChange={this.onChangeScore} value={this.state.score} />/10</td>
                  </tr>
                  <tr>
                    <td colspan="2">Synopsis</td>
                  </tr>
                  <tr>
                    <td colspan="2"><textarea className="form-control" name="synopsis" rows="10" cols="50" onChange={this.onChangeSynopsis} value={this.state.synopsis} /></td>
                  </tr>
                </tbody>
              </table>
              <input type="submit" value="Update" className="btn btn-primary mr-5" />
              <Link to={"/view/" + this.state.id} className="btn btn-primary">Cancel</Link>
            </div>
        </div>
        </form>
      </div>
    )
  }
}