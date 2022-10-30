import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {guess, startGame, restart} from './axios';

function App() {
  const [hasStarted, setHaStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState(' ');

  const wiinningMode = (
    <>
      <p>you won! the number was {number}.</p> 
      <button //TODO
      >restart</button>
    </>
  )
  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input 
      type='text' 
      id='input_number' 
      value={number} 
      onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button 
        //onClick={handleGuess}
        disabled={!number}
      >guess!</button>
      <p>{status} test</p>
    </>
  )
  const startMenu = (
    <div>
      <button onClick={() => setHaStarted(true)}
      >
      start game
      </button>
    </div>
  )
  const handleGuess = async() => {
    const response = await guess(number);

    if (response === 'Equal') {
      setHasWon(true);
    }
    else {
      setStatus(response);
      SVGAnimatedNumber('');
    }
  } 
  const game = (
    <div>
      {hasWon ? wiinningMode : gameMode}
    </div>
  )
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  )
}

export default App;