/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, boardSize, x, y, newNonMinesCount) => {
  console.log(x + " " + y);
  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
  if (board[x][y].revealed == false && !board[x][y].flagged) {
      board[x][y].revealed = true;
      newNonMinesCount -= 1;

    if(board[x][y].value == 0) {
      if (x > 0 && y > 0) {
        revealed(board, boardSize, x-1, y-1, newNonMinesCount);
      }
      if (y > 0) {
        revealed(board, boardSize, x, y-1, newNonMinesCount);
      }
      if (x < boardSize-1 && y > 0 ) {
        revealed(board, boardSize, x+1, y-1, newNonMinesCount);
      }
      if (x > 0) {
        revealed(board, boardSize, x-1, y, newNonMinesCount);
      }
      if (x < boardSize-1) {
        revealed(board, boardSize, x+1, y, newNonMinesCount);
      }
      if (x > 0 && y < boardSize-1) {
        revealed(board, boardSize, x-1, y+1, newNonMinesCount);
      }
      if (y < boardSize-1) {
        revealed(board, boardSize, x, y+1, newNonMinesCount);
      }
      if (x < boardSize-1 && y < boardSize-1) {
        revealed(board, boardSize, x+1, y+1, newNonMinesCount);
      }
    }
  }
  //console.log("return x y: "+x+" "+y+" " + newNonMinesCount);
  return { board, newNonMinesCount };
};
