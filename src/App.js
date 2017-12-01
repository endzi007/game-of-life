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
  componentDidMount(){
    actions.startGame();
  }
  render() {
    return (
      <div>
        <Header />
        <GameControls />
        <div className="mainDiv">
         <GridComponent />
      </div>
      <Generation />
      </div>

    );
  }
}

export default App;