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
  return {
    assignCell,
    outputValue
  };
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

  function getBoard() {
    return board.printBoard();
  }

  //TODO Create module in function "selectWinner" for diagonals.
  function selectWinner() {
    function rowWin(row) {
      const winnerBoard = board.printBoard(row);

      // const winnerBoard = {
      //   0: [1, 1, 1],
      //   1: [0, 0, 0],
      //   2: [0, 0, 0]
      // }

      console.log(winnerBoard, player);
      let winTrue = true;
      for (element of winnerBoard[row]) {
        if (element !== player) {
          winTrue = false;
          break;
        }
      }

      if (winTrue === true) {
        console.log(`Player ${player}, you've won. Play again?`);
      } else {
        console.log(`Player ${player}, you've lost. Play again?`);
      }
      
      console.log(winTrue);
    }

    function columnWin(column, player) {
      // const winnerBoard = {
      //   0: [1, 0, 0],
      //   1: [1, 0, 0],
      //   2: [1, 0, 0]
      // }

      const winnerBoard = board.printBoard(column);
      console.log(winnerBoard);
      let winTrue = false;

      for (let i = 0; i < 2; i++) {
        if (winnerBoard[i][column] !== player) {
          winTrue = true;
          break;
        }
      }

      if (winTrue === true) {
        console.log(`Player ${player}, you've won. Play again?`);
      } else {
        console.log(`Player ${player}, you've lost. Play again?`);
      }

      console.log(winTrue);
    }

    return {
      rowWin,
      columnWin
    };
  }

  //Start of new game message to console.
  startNewRound();

  return {
    changeCurrentPlayer,
    getCurrentPlayer,
    playRound,
    startNewRound,
    getBoard,
    selectWinner
  };
}

// the variable "game" and function "playGame" are to help debug the game in the console, and won't be used later on
const game = GameFlow();
function playGame(row, column) {
  game.playRound(row, column);
}

//or selecting a winner
// Logic to reset game once winner is selected

//   console.log("console.log: Function selectWinner has executed.");
//   return winTrue;
// }
