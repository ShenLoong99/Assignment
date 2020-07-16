import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class InsertManga extends Component {
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
      axios.get(`show?title=${this.state.search}`)
      .then(response =>{
        var str = 'none'
        this.setState({
          mangas: [...this.state.mangas, response.data],
          loading: false
        })
        document.getElementById('error-message').style.display = str;
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  insert(manga, e){
    e.preventDefault();
    this.state.loading1 = true;
    if(this.state.loading1 === true) {
      axios.get(`add?title=${manga}`)
        .then(res => {
          console.log(res.data)
          this.setState({loading1: false})
        });
    }
    this.state.reload = true;
    setTimeout(function () {
      window.location = '/mangaList';
  }, 5000);
  }

  // user iput
	handleChange = (e) => {
		e.preventDefault();
		this.setState({ search: e.target.value });
  };
  
  // when click search button will call search function
  async onClick2(e) {
    e.preventDefault();
    this.state.loading = true;
    await this.search('1');
  }

  keyPress(e){
    e.preventDefault();
    console.log(this)
    console.log(e.key)
    if(e.key === 'Enter'){
      this.onClick2();
       console.log('value', e.target.value);
    }
    else{}
  }

  render() {
    const  IsLoading  = this.state.loading;
    const IsLoading1 = this.state.loading1;
    var {mangas} = this.state;
    return (
      <div>
        <h3>Insert New Manga</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Manga Name: </label>
            <input  type="text"
                required
                className="form-control"
                placeholder="Search for manga, do not press enter to search, click the search button"
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
          {mangas.map((manga) => (
            <tbody key="manga.key">
            <tr>
              <td><img src={manga.posterImg} width="44px" height="67px" alt="poster"/></td>
              <td>{manga.mangaName}</td>
              <td>{manga.mangaCreatedAt.substring(0,10)}</td>
              <td>{manga.animeGenres}</td>
              <td>
                <Button className="btn btn-primary" onClick={(e) => this.insert(manga.mangaName, e)}>{IsLoading1 ? 'Inserting...' : 'Insert'}</Button> <Link className="btn btn-primary" to={"/viewNewManga/" + manga.mangaName}>View</Link>
              </td>
            </tr>
            </tbody>
          ))}
        </table>
      </div>
    )
  }
}