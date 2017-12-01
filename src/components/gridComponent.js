import React, { Component } from "react";
import GridItem from './gridItem';
import GameStore from '../js/store';
import _ from 'lodash';
class GridComponent extends Component {
    constructor(){
        super();
        this.state = {
            board: []
        }
    }
    componentWillMount(){
        this.setState({
            board: GameStore.returnBoardState()
        });
    }
    componentDidMount(){
        console.log(this.state.board);
        GameStore.on("change", () => {
            this.setState({
                board: GameStore.returnBoardState()
            }); 
        });
    }

    changeState(){
        GameStore.on("change", () => {
            let temp = GameStore.returnBoardState();
            this.setState({
                board: temp
            });
        });

    }
    render(){
        let width = GameStore.state.boardDim.width === 70 ? 1000 / 70 : 800 / 50;
        var temp = [];
        _.map(_.flattenDeep(this.state.board), function(element, i){
            temp.push(<GridItem width = {width} key={"div_"+i} id={"div"+element.x+"_"+element.y} x ={element.x} y={element.y} class= {element.life}/>)
        });
                
        return(
            temp
        );


    }
}

export default GridComponent;