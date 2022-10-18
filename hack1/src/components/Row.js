/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>

                <div className='Row-wordbox' id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[0]}</div>
                <div className='Row-wordbox' id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[1]}</div> 
                <div className='Row-wordbox' id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[2]}</div>
                <div className='Row-wordbox' id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[3]}</div>
                <div className='Row-wordbox' id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;