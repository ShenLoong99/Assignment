import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SearchManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mangas: [],
      search: '',
      loading: false,
      loading1: false
    };

    this.search = this.search.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.search();
  }

  componentDidMount() {
    this.search();
  }

  search(a = null){
    if(this.state.loading === true){
      axios.get(`/find?title=${this.state.search}`)
      .then(result => {
        console.log(result);
        if (result.data == "") {
          this.setState ({ 
            mangas: "none",
            loading: false
          });
          return;
        }
        this.setState({
          mangas: result.data,
          loading: false
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  // user iput
	handleChange = (e) => {
		e.preventDefault();
		this.setState({ search: e.target.value });
  };
  
  // when click search button will call search function
  async onClick2(e) {
    this.state.loading = true;
    await this.search('1');
  }

  keyPress(e) {
    e.preventDefault();
    if(e.key === 'Enter'){
      this.onClick2();
       console.log('value', e.target.value);
    }
    else{}
  }

  render() {
    const  IsLoading  = this.state.loading;
    var {mangas} = this.state;
    return (
      <div>
        <h3>Search Manga in Database</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Manga Name: </label>
            <input  type="text"
                required
                className="form-control"
                placeholder="Search for manga, make sure name is exactly the same in database, do not press enter to search, click the search button"
                name="search"
                onChange={this.handleChange}
                />
          </div>
          <div className="form-group">
            <Button className="btn btn-primary" onClick={this.onClick2} onKeyDown={(e)=>this.keyPress(e)}>{IsLoading ? 'Searching...' : 'Search'}</Button>
              {' '}
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
          mangas.map((manga) => (
            <tbody key="manga.key">
            <tr>
              <td><img src={manga.posterImg} width="44px" height="67px" alt="poster"/></td>
              <td>{manga.mangaName}</td>
              <td>{manga.mangaCreatedAt}</td>
              <td>{manga.animeGenres}</td>
              <td>
                <Link className="btn btn-primary" to={"/view/" + manga._id}>View</Link>
              </td>
            </tr>
            </tbody>
          ))}
        </table>
      </div>
    )
  }
}