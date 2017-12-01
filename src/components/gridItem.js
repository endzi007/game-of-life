import React, { Component } from "react";
import * as actions from '../js/actions';

class GridItem extends Component{

    handleClick(e){
        let x = this.props.x;
        let y = this.props.y;
        actions.clickedObject(x, y);
        e.target.className="alive";
    }
    render(){
        return (
            <div className = {this.props.class} onClick={this.handleClick.bind(this)} style={{width: this.props.width, height: this.props.width}}></div>
        );
    }
}

export default GridItem;