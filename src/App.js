import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import MenuApp from './components/MenuApp'
import Cell from './components/Cell'


function App() {
  return (
    <div className="App">
        <Menu/>
        <div>
            <MenuApp/>
        </div>
        <div>
          <Cell/>
        </div>
    </div>
  );
}

export default App;
