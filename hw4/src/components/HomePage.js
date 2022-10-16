/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */
        <button className = "btn" onClick={startGameOnClick}>Start Game</button>
      }
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */
        <div className='controlContainer'>
          <button className='btn' onClick={() => {setShowPanel(!showPanel)}}>Difficulty Adjustment</button>
          <div className='controlWrapper' style={{visibility: !showPanel && "hidden"}}>
            <div className='error' style={{color:"#880000", visibility: ((mineNum > (boardSize*boardSize))? false:true) && "hidden"}}>ERROR: Mines number and board size are invalid!</div>
            {/*
            <div className='error' style={{visibility: (mineNum > (boardSize*boardSize))? true:true && "hidden"}}>ERROR: Mines number and board size are invalid!</div>
              */
            }
            <div className='controlPane'>
              <div className='controlCol'>
                <p className='controlTitle'>Mines Number</p>
                <input type='range' step={1} min={1} max={20} defaultValue={10} 
                  onInput={(e) => {mineNumOnChange(e.target.value); 
                    if(e.target.value > (boardSize*boardSize)){setError(true)}
                    else{
                        setError(false);
                    };}} 
                  onChange={(e) => mineNumOnChange(e.target.value)}>
                </input>
                <p className='controlNum' style={{color: "#0f0f4b", display: error && "none"}}>{mineNum}</p>
                <p className='controlNum' style={{color: "#880000", display: (!error) && "none"}}>{mineNum}</p>
              </div>
              <div className='controlCol'>
                <p className='controlTitle'>Board Size(n*n)</p>
                <input type="range" step={1} min={1} max={20} defaultValue={8} 
                  onInput={(e) => {boardSizeOnChange(e.target.value); 
                  if(mineNum > (boardSize* boardSize)) {setError(true)}
                  else {setError(false)};}} 
                  onChange={(e) => {boardSizeOnChange(e.target.value); 
                  if(mineNum > (boardSize* boardSize)) {setError(true)}
                  else {setError(false)};}} 
                >
                </input>
                <p className='controlNum' style={{color: "#0f0f4b", display: error && "none"}}>{boardSize}</p>
                <p className='controlNum' style={{color: "#880000", display: (!error) && "none"}}>{boardSize}</p>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  );

}
export default HomePage;   