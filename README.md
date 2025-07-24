# Tic-Tac-Toe

A browser-based Tic-Tac-Toe game built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

## Features

- **Interactive gameplay** - Click on cells to place X's and O's
- **Win detection** - Automatically detects wins across rows, columns, and diagonals
- **Tie detection** - Recognizes when the board is full with no winner
- **Game state management** - Prevents further moves after game ends
- **Reset functionality** - Start a new game anytime with the reset button
- **Visual feedback** - Clear status messages showing whose turn it is and game results
- **Responsive design** - Clean, colorful interface with hover effects

## How to Play

1. Player One (X) goes first
2. Click on any empty cell to place your token
3. Players alternate turns
4. First player to get three in a row (horizontally, vertically, or diagonally) wins
5. If all cells are filled with no winner, the game is a tie
6. Click "RESET" to start a new game

## Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling, layout, and visual design
- **JavaScript (ES6)** - Game logic and DOM manipulation

## Code Architecture

The project uses a modular approach with factory functions:

- **`Gameboard()`** - Manages the 3x3 game board state
- **`CellValue()`** - Represents individual cell values (0, 1, or 2)
- **`GameFlow()`** - Controls game flow, player turns, and win/tie detection

## Live Demo

🎮 **[Play the game here!](https://strong-biscotti-b6dd37.netlify.app/)**

## Learning Objectives

This project helped me practice:
- Factory functions and module patterns
- DOM manipulation and event handling
- Game state management
- Separating concerns between game logic and UI
- CSS Grid and Flexbox layouts
- Problem-solving and debugging