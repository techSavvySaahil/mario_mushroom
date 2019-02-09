import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './components/Board';

class App extends Component {
  state = {
    width: 0,
    height: 0
  }

  askUserInp(param) {
    return prompt(`What should be the ${param} of board ?`)
  }
  componentDidMount() {
    alert(`We're building a maze game for you.`);
    let width = 0;
    let height = 0;

    while(!width || isNaN(width)){
      width = this.askUserInp('width');
    }

    while(!height || isNaN(height)){
      height = this.askUserInp('height');
    }
    

    this.setState({
      width,
      height
    })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        {this.state.width && this.state.height &&
          <Board width={this.state.width} height={this.state.height} />
        }
      </div>
    );
  }
}

export default App;
