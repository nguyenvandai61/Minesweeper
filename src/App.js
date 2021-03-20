import React, { Component } from 'react'
import './App.css';
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'
import {Levels} from './constants'
import store from './stores/levels'
import stateRestartStore from './stores/stateRestart';
import stateGameoverStore from './stores/stateGameover';
import stateActions from './actions/state';
import levelActions from './actions/levels';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRestart: false,
      isGameover: false
    }
  }
  componentDidMount() {
    this.subscribeStateGame();
  }

  selectLevel = (level) => { 
    stateActions.setGameOverState(false);
    stateActions.setRestartState(true);
    console.log(level)
    levelActions.setLevel(Levels[level]);
  }
  subscribeStateGame() {
    stateGameoverStore.subscribe(() => {
      console.log("state Gameover store changed");
      this.setState({isGameover: stateGameoverStore.getState()})
    })
    stateRestartStore.subscribe(() => {
      console.log("state Restart store changed");
      this.setState({isRestart: stateRestartStore.getState()})
    })
  }

  render() {
    let {isRestart, isGameover} = this.state;
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
