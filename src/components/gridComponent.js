import React, { Component } from "react";
import GridItem from './gridItem';
import GameStore from '../js/store';
class GridComponent extends Component {
    constructor(){
        super();
        this.state = {
            board: []
        }
    }

    componentWillMount(){
        GameStore.emit("change");
    }
    componentDidMount(){
        GameStore.on("change", function(){
            let temp = GameStore.returnBoardState();
            this.setState({
                board: temp
            });
        });
    }
    render(){
        var temp = [];
            for(var y = 0; y<this.state.size.width; y++){
                temp.push(<GridItem x = {x} y = {y} class= "death"/>)
            }

        return(
            temp
        );


    }
}

export default GridComponent;