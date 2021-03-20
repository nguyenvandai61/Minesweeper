import React, { Component } from 'react'
import './App.css';
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Levels } from './constants'
import stateRestartStore from './stores/stateRestart';
import stateGameoverStore from './stores/stateGameover';
import stateActions from './actions/state';
import levelActions from './actions/levels';
import { Button, DialogActions } from '@material-ui/core';
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
      this.setState({ isGameover: stateGameoverStore.getState() })
    })
    stateRestartStore.subscribe(() => {
      this.setState({ isRestart: stateRestartStore.getState() })
    })
  }

  render() {
    let { isRestart, isGameover } = this.state;
    return (
      <div className="App">
        <Menu selectLevel={this.selectLevel} />
        <MenuApp />
        <div>
          <Board />
        </div>
        <Dialog
          open={isGameover}
          color="primary"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">GAME OVER</DialogTitle>
          <DialogActions>
            <Button variant="error" onClick={() => stateActions.setGameOverState(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
