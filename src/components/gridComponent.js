import React, { Component } from "react";
import GridItem from './gridItem';
class GridComponent extends Component {
    constructor(){
        super();
        this.state = {
            size: {
                width: 50,
                height: 30
            }
        }
    }
    render(){
        var temp = [];
        for(var x = 0; x<this.state.size.height; x++){
            for(var y = 0; y<this.state.size.width; y++){
                temp.push(<GridItem x = {x} y = {y} class= "death"/>)
            }
        }
        return(
            temp
        );


    }
}

export default GridComponent;