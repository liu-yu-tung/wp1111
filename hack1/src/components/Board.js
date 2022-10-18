/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React, { useState } from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    const [board, setBoard] = useState([]);
    let newBoard = [];
    for (let i=0; i<6; i++) {
        if (i == turn) {
            newBoard.push(<CurRow curGuess={curGuess} key={i} />);
        }
        else {
            newBoard.push(<Row guess={guesses} key={i} />);
        }
    }
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {newBoard} 
        </div>

    )
};
export default Board;
