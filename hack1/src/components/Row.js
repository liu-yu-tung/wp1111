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
    
    let test = <div className={'Row-wordbox ${guess[0]?:"grey filled"}'} id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[0]}</div>;
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div className={'Row-wordbox ${guess[0]?:"grey filled"}'} id={rowIdx+"-0"} key={rowIdx+"-0" }>{guess[0]}</div>
                <div className='Row-wordbox' id={rowIdx+"-1"} key={rowIdx+"-1" }>{guess[1]}</div> 
                <div className='Row-wordbox' id={rowIdx+"-2"} key={rowIdx+"-2" }>{guess[2]}</div>
                <div className='Row-wordbox' id={rowIdx+"-3"} key={rowIdx+"-3" }>{guess[3]}</div>
                <div className='Row-wordbox' id={rowIdx+"-4"} key={rowIdx+"-4" }>{guess[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;