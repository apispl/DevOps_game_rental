import React, { Component } from "react";
import gameService from "../services/game.service";
// import { Link } from "react-router-dom";

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.retrieveGames = this.retrieveGames.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveGame = this.setActiveGame.bind(this);

    this.state = {
      games: [],
      currentGame: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveGames();
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

  render() {
    const { games, currentGame, currentIndex } = this.state;

    return (
      <div className="list row">
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
                {currentGame.id}
              </div>
              <div>
                <label>
                  <strong>Manufacturer:</strong>
                </label>{" "}
                {currentGame.manufacturer}
              </div>

              {/* <Link
                to={"/games/" + currentGame.id}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
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