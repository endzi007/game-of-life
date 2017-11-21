import React, { Component } from "react";
import * as actions from '../js/actions';

class GridItem extends Component{
    handleClick(e){
        actions.clickedObject("23");
        e.target.className="alive";
    }
    render(){
        return (
            <div className = {this.props.class} onClick={this.handleClick}></div>
        );
    }
}

export default GridItem;