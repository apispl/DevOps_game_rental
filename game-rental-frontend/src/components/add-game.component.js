import React, { Component } from "react";
import gameService from "../services/game.service";

export default class AddGame extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePublishDate = this.onChangePublishDate.bind(this);
        this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
        this.saveGame = this.saveGame.bind(this);
        this.newGame = this.newGame.bind(this);
    
        this.state = {
          id: "",
          title: "",
          publishDate: "", 
          manufacturer: "",
    
          submitted: false
        };
      }
    
      onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
      }
    
      onChangePublishDate(e) {
        this.setState({
            publishDate: e.target.value
        });
      }

      onChangeManufacturer(e) {
        this.setState({
            manufacturer: e.target.value
        });
      }
    
      saveGame() {
        var data = {
          id: this.state.id,
          title: this.state.title,
          publishDate: this.state.publishDate,
          manufacturer: this.state.manufacturer
        };
        console.log(data);
        gameService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              title: response.data.title,
              publishDate: response.data.publishDate,
              manufacturer: response.data.manufacturer,
    
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      newGame() {
        this.setState({
          id: null,
          title: "",
          publishDate: "",
          manufacturer: "",
    
          submitted: false
        });
      }
    
      render() {
        return (
            <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newGame}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="publishDate">Publish Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="publishDate"
                    required
                    value={this.state.publishDate}
                    onChange={this.onChangePublishDate}
                    name="publishDate"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="manufacturer">Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="manufacturer"
                    required
                    value={this.state.manufacturer}
                    onChange={this.onChangeManufacturer}
                    name="manufacturer"
                  />
                </div>
    
                <button onClick={this.saveGame} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
 }
