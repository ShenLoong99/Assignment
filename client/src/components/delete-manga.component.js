import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

export default class DeleteManga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      reload: false,
      mangas: []
    };
    this.deleteAll();
    this.deleteOne();
  }

  componentDidMount() {
    axios.get('/getAllData')
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

  // Delete all documents in mongoDB function
  deleteAll = async () => {
    var fin = false;
    for (var i = 0; i < this.state.mangas.length; i++) {
        var id = this.state.mangas[i]._id;
        await axios.get(`/delete?id=${id}`)
        .then(res => {
          console.log(res.data)
          fin = true;
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
    if (fin == true) {
      window.location = '/mangaList';
    }
  }

  // Delete one document in mongoDB function
  deleteOne = async (id) => {
    await axios.get(`/delete?id=${id}`)
      .then(res => {
        console.log(res.data)
        window.location.reload();
      })
      .catch((error) => {
				alert("Error: " + error);
			});
  }

  render() {
    var {mangas} = this.state;
    return (
      <div>
        <div className="row pb-2">
          <h3 className="ml-3 ">Manga records in Database</h3>
          <Button id="delete-all" className="btn btn-primary ml-5" onClick={() => { if (window.confirm('Are you sure you want to delete all records?')) this.deleteAll()}}>Delete All</Button>
        </div>
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
            (mangas.map((manga) => (
              <tr key="manga._id">
                <td><img src={manga.posterImg} width="44px" height="67px" alt="poster"/></td>
                <td>{manga.mangaName}</td>
                <td>{manga.mangaCreatedAt.substring(0,10)}</td>
                <td>{manga.animeGenres}</td>
                <td>
                  <Button className="btn btn-primary" onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) this.deleteOne(manga._id) } }>Delete</Button>
                </td>
              </tr>
            )))}
            </tbody>
        </table>
      </div>
    )
  }
}