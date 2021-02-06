import React, { Component } from 'react'
import logo from './logo.svg';

import './App.css';
import { ThemeContext, themes } from "./components/Theme/ThemeContext";
import ThemedButton from "./components/Theme/ThemedButton";
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'
import { AppContext } from './AppContext';

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
      theme: themes.light
    }
  }

  toggleRestart = () => {
    let isRestart = this.state.isRestart;
    this.setState({isRestart: !isRestart});
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark
        ? themes.light
        : themes.dark
    }))
  }

  render() {
    let { isRestart } = this.state;
    return (
      <div className="App">
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Menu />
        <MenuApp restart={this.toggleRestart}/>
        <div>
          <AppContext.Provider value={{isRestart: isRestart, toggleRestart: this.toggleRestart}}>
            <Board/>
          </AppContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
