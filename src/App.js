import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Board from './components/Board'


function App() {
  return (
    <div className="App">
        <Menu/>
        <div>
            <MenuApp/>
        </div>
        <div>
          <Board/>
        </div>
    </div>
  );
}

export default App;
