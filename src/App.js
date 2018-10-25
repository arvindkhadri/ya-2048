import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './Grid.css';
import Grid from './Grid.js'

class App extends Component {
  render() {
    return (<div className="container">
              <h4>Yet another 2048!</h4>
              <Grid size="4"/>
            </div>);  }
}

export default App;
