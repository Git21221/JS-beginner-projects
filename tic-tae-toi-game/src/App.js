import { useContext } from 'react';
import './App.css';
import Board from "./components/Board/Board"
import { GameContext } from './components/Context/GameContext';
import Model from './components/model/Model';
import Starter from "./components/Starter/Starter"

function App() {

  const {screen} = useContext
  (GameContext)

  return (
    <div className="App">
        <div className="container">
          {screen === 'start' && <Starter/>}
          {screen === 'game' &&  <Board/>}
        </div>
        <Model/>
    </div>
  );
}

export default App;
