/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    if (board[x][y].revealed == false) {
        board[x][y].revealed = true;
        newNonMinesCount--;

      if(board[x][y].value == 0) {
        console.log("found value == 0");
        if (x > 0 && y > 0 && board[x-1][y-1]!= null) {
          revealed(board, x-1, y-1, newNonMinesCount);
        }
        if ( y > 0 && board[x][y-1]!= null) {
          revealed(board, x, y-1, newNonMinesCount);
        }
        if (y > 0 && board[x+1][y-1]!= null) {
          revealed(board, x+1, y-1, newNonMinesCount);
        }
        if (x> 0 && board[x-1][y]!= null) {
          revealed(board, x-1, y, newNonMinesCount);
        }
        if (board[x+1][y]!= null) {
          revealed(board, x+1, y, newNonMinesCount);
        }
        if (x> 0 && board[x-1][y+1]!= null) {
          revealed(board, x-1, y+1, newNonMinesCount);
        }
        if (board[x][y+1]!= null) {
          revealed(board, x, y+1, newNonMinesCount);
        }
        if (board[x+1][y+1]!= null) {
          revealed(board, x+1, y+1, newNonMinesCount);
        }
      }
    }

    return { board, newNonMinesCount };
};
