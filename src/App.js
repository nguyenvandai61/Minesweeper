import React, { Component } from 'react'
import logo from './logo.svg';

import './App.css';
import { ThemeContext, themes } from "./components/Theme/ThemeContext";
import ThemedButton from "./components/Theme/ThemedButton";
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'
import { AppContext, Levels } from './AppContext';

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRestart: false,
      isGameover: false,
      selectedCell: -1,
      theme: themes.light,
      level: Levels.SUPEREASY
    }
  }

  toggleRestart = () => {
    console.log("ttoggle restart")
    let isRestart = this.state.isRestart;
    this.setState({ isRestart: !isRestart });
  }
  toggleGameover = () => {
    console.log("ttoggle gameover")
    this.setState({ isGameover: !this.state.isGameover});
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark
        ? themes.light
        : themes.dark
    }))
  }


  selectLevel = (value) => {
    // Value : Levels.MEDIUM ..
    this.setState({isRestart: true,level: Levels[value]});
  }

  render() {
    let { isRestart, isGameover, level, selectedCell } = this.state;
    return (
      <AppContext.Provider 
      value={{ 
        isRestart, isGameover, level, 
      selectedCell,
      toggleGameover: this.toggleGameover,
      toggleRestart: this.toggleRestart,
       }}>
        <div className="App">
          <ThemeContext.Provider value={this.state.theme}>
            <Toolbar changeTheme={this.toggleTheme} />
          </ThemeContext.Provider>
          <Menu selectLevel={this.selectLevel}/>
          <MenuApp />
          <div>
            <Board/>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
