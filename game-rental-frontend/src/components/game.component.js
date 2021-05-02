import React, { Component } from "react";
import gameService from "../services/game.service";

export default class GameOne extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle  = this.onChangeTitle.bind(this);
        this.onChangePublishDate = this.onChangePublishDate.bind(this);
        this.onChangePublishManufacturer = this.onChangePublishManufacturer.bind(this);
        this.getGame = this.getGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    
        this.state = {
          currentGame: {
            id: null,
            title: "",
            publishDate: "",
            manufacturer: ""
          },
          message: ""
        };
      }
    
      componentDidMount() {
        this.getGame(this.props.match.params.id);
      }
    
      onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentGame: {
              ...prevState.currentGame,
              title: title
            }
          };
        });
      }
    
      onChangePublishDate(e) {
        const publishDate = e.target.value;
        
        this.setState(prevState => ({
          currentGame: {
            ...prevState.currentGame,
            publishDate: publishDate
          }
        }));
      }

      onChangePublishManufacturer(e) {
        const manufacturer = e.target.value;
        
        this.setState(prevState => ({
          currentGame: {
            ...prevState.currentGame,
            manufacturer: manufacturer
          }
        }));
      }
    
      getGame(id) {
        gameService.get(id)
          .then(response => {
            console.log(response.data);
            this.setState({
              currentGame: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      updateGame() {
        gameService.update(
          this.state.currentGame.id,

          this.state.currentGame
        )
          .then(response => {
            console.log(response.data);
            this.setState({
              message: "The tutorial was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      deleteGame() {
        gameService.delete(this.state.currentGame.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/games')
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      render() {
        const { currentGame } = this.state;

        return (
            <div>
                {currentGame ? (
                <div className="edit-form">
                    <h4>Game</h4>
                    <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={currentGame.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Publish Date</label>
                        <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentGame.publishDate}
                        onChange={this.onChangePublishDate}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Manufacturer</label>
                        <input
                        type="text"
                        className="form-control"
                        id="manufacturer"
                        value={currentGame.manufacturer}
                        onChange={this.onChangePublishManufacturer}
                        />
                    </div>
                    </form>

                    <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteGame}
                    >
                    Delete
                    </button>

                    <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateGame}
                    >
                    Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
                )}
            </div>
        );
    }
}