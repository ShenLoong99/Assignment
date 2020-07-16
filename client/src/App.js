import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";

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
import ViewNewManga from "./components/view-new-manga.component";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <Navbar />
      <br/>
      <Switch>
        <Route path="/" exact component={LoginUser} />
        <Route path="/registerUser" component={RegisterUser} />
        <Route path="/mangaList" exact component={MangaList} />
        <Route path="/view/:id" component={ViewManga} />
        <Route path="/edit/:id" component={EditManga} />
        <Route path="/insert" component={InsertManga} />
        <Route path="/search" component={SearchManga} />
        <Route path="/delete" component={DeleteManga} />
        <Route path="/viewUser" component={ViewUser} />
        <Route path="/viewNewManga/:mangaName" component={ViewNewManga} />
        {/* if route not found */}
			  <Route path="*" component={LoginUser} />
      </Switch>
      <br/>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;