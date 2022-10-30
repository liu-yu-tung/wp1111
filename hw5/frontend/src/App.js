import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {guess, startGame, restart} from './axios';

function App() {
  const [hasStarted, setHaStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  const [ans, setAns] = useState('');

  const handleStart = async() => {
    setHaStarted(true);
    let msg = await startGame();
    console.log(msg);
  }
  const handleGuess = async() => {
    const response = await guess(number);
    if (response === 'Equal') {
      setHasWon(true);
      setAns(number);
    }
    else {
      setStatus(response);
    }
    setNumber('');
  } 
  const wiinningMode = (
    <>
      <p>you won! the number was {ans}.</p> 
      <button onClick={()=> {handleStart(); setHasWon(false)}} 
      >restart</button>
    </>
  )
  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input 
      type='number' 
      id='input_number' 
      value={number} 
      onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button 
        onClick={handleGuess}
        disabled={!number}
      >guess!</button>
      <p>{status} test</p>
    </>
  )
  const startMenu = (
    <div>
      <button onClick={handleStart}
      >
      start game
      </button>
    </div>
  )
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
