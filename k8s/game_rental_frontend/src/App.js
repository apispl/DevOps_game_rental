import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddGame from "./components/add-game.component";
import GameList from "./components/list-game.component";
import GameOne from "./components/game.component";

class App extends Component {
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/games" className="navbar-brand">
              GamesAPI
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/games"} className="nav-link">
                  List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
  
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/games"]} component={GameList} />
              <Route exact path="/add" component={AddGame} />
              <Route path="/games/:id" component={GameOne} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
