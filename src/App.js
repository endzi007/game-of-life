import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import GridComponent from './components/gridComponent';
import GameStore from './js/store';
import GameControls from './components/gameControls';
import Generation from './components/generationComponent';
import * as actions from './js/actions';
class App extends Component {

  constructor(){
    super();
    this.state = {
      width: 1000
    }
  }
  componentDidMount(){
    GameStore.on("changed width", ()=>{
     this.setState({width: GameStore.state.boardDim.width});
    })
    actions.startGame();
  }
  render() {
    let width = GameStore.state.boardDim.width === 70 ? 1000 : 800;
    return (
      <div>
        <Header />
        <GameControls />
        <div className="mainDiv" style ={{width: width+"px"}}>
         <GridComponent />
      </div>
      <Generation />
      </div>

    );
  }
}

export default App;