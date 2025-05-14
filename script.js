function Gameboard() {
  //initial creation of a gameboard with 3 columns and 3 rows
  const rows = 3;
  const columns = 3;
  const board = [];

  //creating an instance of cellValue() to populate the board
  const cellValue = CellValue();

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(CellValue());
    }
  }

  //method to acesss board to future UI
  function outputBoard() {
    return board;
  }

  //function for player to place token
  function placeToken(row, column, player) {
    //Token placement validation
    if (board[row][column].outputValue() !== 0) {
      console.log(`Invalid play, choose again.`);
    } else {
      board[row][column].assignCell(player);
    }
  }

  // function to update gameboard with new values
  function printBoard() {
    const boardValues = board.map((row) =>
      row.map((cell) => cell.outputValue())
    );
    console.log(boardValues);
  }

  return {
    outputBoard,
    placeToken,
    printBoard
  };
}

//function to set the cell value, 0 for initial value, 1 for player one, 2 for player two
function CellValue() {
  //set initial value of all cells to 0
  let value = 0;
  //create method to re-assignCell value to playernumber
  function assignCell(player) {
    value = player;
  }
  //create method to output final value to be used in Gameboard()
  function outputValue() {
    return value;
  }
  //return the methods assignCell and outputValue to be used outside the function
  return { assignCell, outputValue };
}

function gameFlow(playerOne = "Player One", playerTwo = "Player Two") {

  const board = Gameboard();

  //Array to store player information, needs to include the players name and the players' tokens "x" and "o"
  const players = [
    {
      name: playerOne,
      token: 1
    },
    {
      name: playerTwo,
      token: 2
    }
  ];

  //Sets initial player activePlayer state to player 0
  let activePlayer = players[0];

  function changeActivePlayer() {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    console.log(`Active player is now ${players.name}.`);
  }

  function getActivePlayer() {
    return activePlayer;
  }
}

// Logic for selecting a winnder
// Logic to reset game once winner is selected

// Test code
const selectPlayerTest = gameFlow();
console.log(selectPlayerTest.getActivePlayer())

// const gameBoard = Gameboard();

// console.log("Initial board:");
// gameBoard.printBoard();

// console.log("Player 2 placing token at [0,0]:");
// gameBoard.placeToken(0, 0, 2);
// gameBoard.printBoard();

// console.log("Player 2 placing second token at [0,0]:");
// gameBoard.placeToken(0, 0, 2);
// gameBoard.printBoard();

// console.log("Player 1 placing token at [0,1]:");
// gameBoard.placeToken(0, 1, 1);
// gameBoard.printBoard();
