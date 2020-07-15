import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import MangaList from "./components/manga-list.component";
import ViewManga from "./components/view-manga.component";
import EditManga from "./components/edit-manga.component";
import InsertManga from "./components/insert-manga.component";
import DeleteManga from "./components/delete-manga.component";
import SearchManga from "./components/search-manga.component";
import Footer from "./components/footer.component";
import LoginUser from "./components/login-user.component";
import RegisterUser from "./components/register-user.component";
import ViewUser from "./components/view-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={LoginUser} />
      <Route path="/registerUser" component={RegisterUser} />
      <Route path="/mangaList" exact component={MangaList} />
      <Route path="/view/:id" component={ViewManga} />
      <Route path="/edit/:id" component={EditManga} />
      <Route path="/insert" component={InsertManga} />
      <Route path="/search" component={SearchManga} />
      <Route path="/delete" component={DeleteManga} />
      <Route path="/viewUser" component={ViewUser} />
      <br/>
      <Footer />
      </div>
    </Router>
  );
}

export default App;