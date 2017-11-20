import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import { Navbar, Grid } from 'react-bootstrap';
import _ from 'lodash';
import GridComponent from './components/gridComponent';
class App extends Component {
  render() {
    return (

      <div className="mainDiv">
            <Header />
        <GridComponent />
      </div>
    );
  }
}

export default App;