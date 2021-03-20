import React, { Component } from 'react'
import './App.css';
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'
import {Levels} from './constants'
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
    levelActions.setLevel(Levels[level]);
  }
  subscribeStateGame() {
    stateGameoverStore.subscribe(() => {
      this.setState({isGameover: stateGameoverStore.getState()})
    })
    stateRestartStore.subscribe(() => {
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
