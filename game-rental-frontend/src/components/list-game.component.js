import React, { Component } from "react";
import gameService from "../services/game.service";
import { Link } from "react-router-dom";

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.retrieveGames = this.retrieveGames.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveGame = this.setActiveGame.bind(this);
    this.onChangeSearchId = this.onChangeSearchId.bind(this);
    this.searchById = this.searchById.bind(this);

    this.state = {
      games: [],
      currentGame: null,
      currentIndex: -1,
      searchId: ""
    };
  }

  componentDidMount() {
    this.retrieveGames();
  }

  onChangeSearchId(e) {
    const searchId = e.target.value;
    
    this.setState({
      searchId: searchId
    });
  }

  retrieveGames() {
    gameService.getAll()
      .then(response => {
        this.setState({
          games: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveGames();
    this.setState({
      currentGame: null,
      currentIndex: -1
    });
  }

  setActiveGame(game, index) {
    this.setState({
      currentGame: game,
      currentIndex: index
    });
  }

  searchById() {
    console.log(this.state.searchId);
    gameService.get(this.state.searchId)
      .then(response => {
        this.setState({
          games: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchId, games, currentGame, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID"
              value={searchId}
              onChange={this.onChangeSearchId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchById}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Games List</h4>
          <ul className="list-group">
            {games &&
              games.map((game, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveGame(game, index)}
                  key={index}
                >
                  {game.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentGame ? (
            <div>
              <h4>Game</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentGame.title}
              </div>
              <div>
                <label>
                  <strong>Publish Date:</strong>
                </label>{" "}
                {currentGame.publishdate}
              </div>
              <div>
                <label>
                  <strong>Manufacturer:</strong>
                </label>{" "}
                {currentGame.manufacturer}
              </div>

              <Link
                to={"/games/" + currentGame.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}