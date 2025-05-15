//Step 1, draw a board.
function Gameboard() {
  //initial creation of a gameboard with 3 columns and 3 rows, board is held in array.
  const rows = 3;
  const columns = 3;
  const board = [];

  //Use nested loops to initially populate the board with the value pulled from CellValue()
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(CellValue());
    }
  }


  function placeToken(row, column, player) {
    // First check if the cell is empty
    if (board[row][column].outputValue() !== 0) {
      console.log(`Invalid play, choose again.`);
      return false;
    } else {
      board[row][column].assignCell(player);
      return true;
    }
  }

  // function to update gameboard with new values
  function printBoard() {
    const boardValues = board.map((row) =>
      row.map((cell) => cell.outputValue())
    );
    return boardValues;
  }

  //Method to acesss board to future UI, this to be implemented later.
  function outputBoard() {
    return board;
  }

  return {
    outputBoard,
    placeToken,
    printBoard
  };
}

//function to set the cell value, 0 for initial value, 1 for player one, 2 for player two
function CellValue() {
  //set initial value of all cells to 0 (0=blank)
  let value = 0;

  //create method to re-assignCell value to playernumber
  function assignCell(player) {
    value = player;
    return value;
  }

  //create method to output final value to be used in Gameboard()
  function outputValue() {
    return value;
  }
  //return the methods assignCell and outputValue to be used outside the function
  return { assignCell, outputValue };
}

function GameFlow() {
  //Creates the instance of the board we will be using for each playthrough
  const board = Gameboard();

  //Array to store player information, needs to include the players name and the players' tokens "x" and "o"
  const players = [
    {
      name: "Player One",
      token: 1
    },
    {
      name: "Player Two",
      token: 2
    }
  ];

  // console.log(board.printBoard());

  //Sets initial player activePlayer state to player 0

  let currentPlayerIndex = 0;
  let currentPlayer = players[0];

  //Method to change the current player
  function changeCurrentPlayer() {

    if (currentPlayerIndex === 0) {
      currentPlayerIndex = 1;
    } else {
      currentPlayerIndex = 0;
    }

    currentPlayer = players[currentPlayerIndex];
    return currentPlayer;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function startNewRound() {
    board.printBoard();
    console.log(`${currentPlayer.name}'s turn.`);
  }

  function playRound(row, column) {
    console.log(
      `Placing ${currentPlayer.name}'s token on (${row}, ${column}).`
    );
    const moveSuccessful = board.placeToken(row, column, currentPlayer.token);
    if (moveSuccessful) {
      changeCurrentPlayer();
    }
    console.log(board.printBoard());
    console.log(`${currentPlayer.name}'s turn.`);
  }

  //Start of new game message to console.
  startNewRound();

  return {
    changeCurrentPlayer,
    getCurrentPlayer,
    playRound,
    startNewRound
  };
}

const game = GameFlow();
function playGame(row, column) {
  game.playRound(row, column);
}

// Logic for selecting a winnder
// Logic to reset game once winner is selected
