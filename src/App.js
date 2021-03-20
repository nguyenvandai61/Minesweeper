import React, { Component } from 'react'
import './App.css';
import ThemedButton from "./components/Theme/ThemedButton";
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'
import {Levels} from './constants'
import store from './stores/levels'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRestart: false,
      isGameover: false,
      selectedCell: -1,
    }
  }

  toggleRestart = () => {
    console.log("ttoggle restart")
    let isRestart = this.state.isRestart;
    this.setState({ isRestart: !isRestart });
  }
  toggleGameover = () => {
    console.log("ttoggle gameover")
    this.setState({ isGameover: !this.state.isGameover });
  }


  selectLevel = (value) => { 
    store.dispatch({
        type: 'SET_LEVEL',
        levels: Levels[value]
    })
  }

  render() {
    return (
        <div className="App">
          <Menu selectLevel={this.selectLevel} />
          <MenuApp />
          <div>
            <Board />
          </div>
        </div>
    );
  }
}

export default App;
