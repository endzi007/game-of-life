import React, { Component } from "react";

class GridItem extends Component{
    handleClick(e){
        e.target.className="alive";
    }
    render(){
        return (
            <div className = {this.props.class} onMouseDown={this.handleClick}></div>
        );
    }
}

export default GridItem;