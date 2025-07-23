function Gameboard() {
  //initial creation of a gameboard with 3 columns and 3 rows, board is held in array.
  const rows = 3;
  const columns = 3;
  const board = [];

  // Function to create 3x3 board using nested loops, one for row creation and one for column creation
  function resetBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(CellValue());
      }
    }
  }


  
  // Function to place a tolken in a specific space in the board using a 0,1,2 3x3 grid
  function placeToken(row, column, player) {
    if (board[row][column].outputValue() !== 0) {
      console.log(`Invalid play, choose again.`);
      return false;
    } else {
      board[row][column].assignCell(player);
      return true;
    }
  }

  // Function to print current board
  function printBoard() {
    const boardValues = board.map((row) =>
      row.map((cell) => cell.outputValue())
    );
    return boardValues;
  }

  //Function to output board to use in furture UI
  function outputBoard() {
    return board;
  }

  return {
    outputBoard,
    placeToken,
    printBoard,
    resetBoard
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

//Function to control the flow of the game.
function GameFlow() {
  //Creates the instance of the board we will be using for each playthrough
  const board = Gameboard();

  let currentPlayerIndex;
  let currentPlayer;

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

  function resetAll() {
    board.resetBoard();
    resetPlayers();
  }

  resetAll();

  //Sets initial player activePlayer state to player 0
  function resetPlayers() {
    currentPlayerIndex = 0;
    currentPlayer = players[0];
  }

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
    // console.log(`${currentPlayer.name}'s turn.`);
  }

  function playRound(row, column) {
    let playAgain;
    function checkPrompt() {
      if (
        playAgain === "YES" ||
        playAgain === "Y" ||
        playAgain === "yes" ||
        playAgain === "y"
      ) {
        console.log(`debug: playAgain = ${playAgain}`);
        resetAll();
        console.log(`${currentPlayer.name}'s turn.`);
        return;
      } else if (
        playAgain === "NO" ||
        playAgain === "N" ||
        playAgain === "no"
      ) {
        playAgain = "n";
        console.log(`debug: playAgain = ${playAgain}`);
        alert('Thanks for playing!')
      } else if (playAgain !== "y" || playAgain !== "n") {
        console.log(`debug: !== if triggered, playAgain = ${playAgain}`);
        playAgain = prompt('Invalid input, please type "y" or "n"');
      } else {
        alert("Thanks for playing! See you again next time.");
        return;
      }

      return;
    }

    console.log(
      `Placing ${currentPlayer.name}'s token on (${row}, ${column}).`
    );

    // Place token, store in moveSucessful to allow for player change.
    const moveSuccessful = board.placeToken(row, column, currentPlayer.token);
    const winCheck = selectWinner();

    const win = winCheck.win(row, column, currentPlayer.token);
    const tie = winCheck.tie();

    console.log(`debug: Current player is ${currentPlayer.token}.`);
    console.log(`debug: win is ${win}`);

    if (win) {
      console.log(`Player ${currentPlayer.token} wins!`);
      console.log(board.printBoard());
      playAgain = prompt(
        `Yay! Player ${currentPlayer.token}, you've won. Play again? (y/n)`
      );
      checkPrompt();
      return; // Exit the function - game is over
    } else if (tie) {
      console.log(`It's a tie!`);
      console.log(board.printBoard());
      playAgain = prompt(`It's a tie! Play again? (y/n)`);
      checkPrompt();
      return; // Exit the function - game is over
    }

    // Only change players if the game continues
    if (moveSuccessful) {
      changeCurrentPlayer();
    }

    console.log(board.printBoard());

    // Console log to confirm next player's turn
    console.log(`${currentPlayer.name}'s turn.`);
  }

  function getBoard() {
    return board.printBoard();
  }

  //Function selectWinner contains the modules columnWin, rowWin and diagonalWin to handle each win condition.
  function selectWinner() {
    //Logic for handling wins with rows
    function rowWin(row, player) {
      const winnerBoard = board.printBoard(row);

      let winTrue = true;
      for (const element of winnerBoard[row]) {
        if (element !== player) {
          winTrue = false;
          break;
        }
      }
      return winTrue;
    }

    //Logic for handling wins with columns
    function columnWin(column, player) {
      const winnerBoard = board.printBoard(column);
      let winTrue = true;

      for (let i = 0; i < 3; i++) {
        if (winnerBoard[i][column] !== player) {
          winTrue = false;
          break;
        }
      }
      return winTrue;
    }

    //Logic for handling wins with diagonals
    function diagonalWin(player) {
      const winnerBoard = board.printBoard();
      let winTrue = false;

      if (
        winnerBoard[0][2] === player &&
        winnerBoard[1][1] === player &&
        winnerBoard[2][0] === player
      ) {
        winTrue = true;
      } else if (
        winnerBoard[0][0] === player &&
        winnerBoard[1][1] === player &&
        winnerBoard[2][2] === player
      ) {
        winTrue = true;
      }
      return winTrue;
    }

    function win(row, column, player) {
      const rowTrue = rowWin(row, player);
      const columnTrue = columnWin(column, player);
      const diagonalTrue = diagonalWin(player);
      let win = false;

      if (rowTrue || columnTrue || diagonalTrue) {
        win = true;
      }

      return win;
    }

    function tie() {
      const tieBoard = board.printBoard();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (tieBoard[i][j] === 0) {
            return false;
          }
        }
      }

      return true;
    }

    return { win, tie };
  }

  //Start of new game message to console.
  startNewRound();

  return {
    changeCurrentPlayer,
    getCurrentPlayer,
    playRound,
    startNewRound,
    getBoard,
    selectWinner,
    resetPlayers
  };
}

// the variable "game" and function "playGame" are to help debug the game in the console, and won't be used later on
let game = GameFlow();
function playGame(row, column) {
  game.playRound(row, column);
}

document.querySelectorAll('.cell').forEach( function(cell) {
  cell.addEventListener('click', function() {
    const row = parseInt(this.dataset.row);
    const column = parseInt(this.dataset.column);
    console.log(`You've clicked cell (${row}, ${column})`)

//TODO fix last placement to update before game finishes.

    //Sets player token to either "x" or "o"
    let player = game.getCurrentPlayer().token;
    let playerToken = "";
    if (player === 2) {
      playerToken = "o";
    } else {
      playerToken = "x"
    };

    console.log(`Current player is: ${player}`)
    this.textContent = playerToken;
    game.playRound(row, column)
  });
});