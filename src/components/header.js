import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button, Nav, NavItem } from 'react-bootstrap';
import * as actions from '../js/actions';
class Header extends Component { 
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
            default:
                break;
        }
    }
    render(){
        return(
        <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Game of Life</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <ul className="nav navbar-nav">
                    <li><a href="https://github.com/endzi007/recipeApp" target="_blank"><i className="fa fa-github fa-lg" aria-hidden="true"></i> Github repository</a></li>
                    <li><a href="https://linkedin.com/in/enis-jašarović-2b9794132" target="_blank"><i className="fa fa-linkedin fa-lg" aria-hidden="true"></i> linkedIn</a></li>
                    <li><a href="https://enis-jasarovic.com" target="_blank"><i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> My Portfolio</a></li>
                </ul> 
                <Nav>
                    <Button bsStyle="danger" id="startGame" onClick={this.handleClick.bind(this)}>Start</Button>
                    <Button bsStyle="" id="stopGame" onClick={this.handleClick.bind(this)}>Stop</Button>
                    <Button bsStyle="" id="clearBoard" onClick={this.handleClick.bind(this)}>Clear</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>        

        );
    }  
}

export default Header;