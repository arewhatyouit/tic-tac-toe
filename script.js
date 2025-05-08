//Create a 3x3 gameboard in the console (Use nested loops)
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  //x2 nested loops to generate game board, i checks the rows, j checks the columns. The value of "CellValue" is pushed to each cell
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(CellValue());
    }
  }

  console.log(board);
}

//Renders game board on the console
Gameboard();

//Defines the value of each cell
function CellValue() {
  let value = 0;
  return value;
}

//Player places a piece by calling a function with a value for X and Y as an argument. Both X and Y have a range of 0-2 (3 total)
//Board array updates with an element in this format [x, y]
const takeTurn = () => {};

//Push the contents of the board array to the rendered gameboard
const printBoard = () => {};

//Check for 3 in a row or a tie game, if none reset into next players turn
const checkWin = () => {};
