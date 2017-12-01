import React, { Component } from 'react';
import * as actions from '../js/actions';
import Generation from './generationComponent';
class GameControls extends Component { 
    handleClick(e){
        let id = e.target.id;
        switch (id) {
            case "startGame":
                actions.startGame();
            break;
            case "stopGame":
                actions.stopGame();
            break;
            case "clearBoard":
                actions.clearBoard();
            break;
            case "70x50":
            actions.changeBoardSize(id);
            break;
            case "50x30":
            actions.changeBoardSize(id);
            break;
            case "makeStep":
            actions.makeStep();
            break;
            default:
                break;
        }
    }
    render(){
        return(
            <ul id="gameControls">
                <i className="btn btn-primary fa fa-play" aria-hidden="true" id="startGame" onClick={this.handleClick.bind(this)}></i>
                <i className="btn btn-info fa fa-stop" id="stopGame" onClick={this.handleClick.bind(this)}></i>
                <i className="btn btn-danger fa fa-eraser" id="clearBoard" onClick={this.handleClick.bind(this)}></i> 
                <i className="btn btn-danger fa fa-repeat" id="makeStep" onClick={this.handleClick.bind(this)}></i>         
                <i className="btn btn-default" id="70x50" onClick={this.handleClick.bind(this)}>70 x 50</i>
                <i className="btn btn-default" id="50x30" onClick={this.handleClick.bind(this)}>50 x 30</i>
            </ul>

        );
    }  
}

export default GameControls;