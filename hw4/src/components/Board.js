/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { Fragment, useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        console.log(newBoard.board);
        let curr_non_mine_count = 0;
        let mine_locations = [];
        let curr_flag = mineNum;
        for (let i=0; i<boardSize; i++) {
            for (let j=0; j<boardSize; j++) {
                if(newBoard.board[i][j].value !== '💣') {
                    curr_non_mine_count++;
                }
                else {
                    mine_locations.push([i, j]);
                }
                if (newBoard.board[i][j].flagged == true) {
                    curr_flag--;
                }
            }
        }
        setNonMineCount(curr_non_mine_count); setMineLocations(mine_locations);
        setRemainFlagNum(curr_flag);
        {
            setBoard(
                newBoard.board
            );
        }
        console.log("value test: " + newBoard.board[0][0].value);
        console.log(mine_locations);
        console.log(board);
        
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        console.log(x+ " "+y);
        if (board[x][y].value == '💣') {
            board[x][y].revealed = true;
            console.log('💣');
            setGameOver(true);

        }
        else {
            board[x][y].revealed = true;
            setNonMineCount(nonMineCount-1);
        }
        //console.log(board[0][0]);
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                <h1>This is the board Page!</h1>  {/* This line of code is just for testing. Please delete it if you finish this function. */}
                <h1>{"nonMineCount: " + nonMineCount}</h1>
                <h1>{mineLocations}</h1>
                <h1>{"test"}</h1>
                    <h1>{"test"}</h1>
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */
                <div className='boardWrapper'>
                <div className='boardContainer'>
                <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {
                        board.map((content, i) =>
                            <div id={"row"+i} style={{display:"flex"}}>
                                {content.map((val ,j) =>
                                    <Cell rowIdx={i} colIdx={j} detail={val} updateFlag={updateFlag} revealCell={revealCell}/>
                                )}
                            </div>
                        )
                    }
                </div>
                </div>
                }
                
            </div>
        </div>
    );



}

export default Board