import chalk from 'chalk';
import _ from 'lodash';
import { getRandomInt, pause } from '../tools.js';

// support functions

const colorStringPoints = (score, player1, player2) => {
  let colorScorePlayer1;
  let colorScorePlayer2;
  if (score[0] > score[1]) {
    colorScorePlayer1 = chalk.green(player1);
    colorScorePlayer2 = chalk.red(player2);
  } else if (score[0] < score[1]) {
    colorScorePlayer1 = chalk.red(player1);
    colorScorePlayer2 = chalk.green(player2);
  } else {
    colorScorePlayer1 = chalk.hex('#B6E1FA')(player1);
    colorScorePlayer2 = chalk.hex('#B6E1FA')(player2);
  }
  return [colorScorePlayer1, colorScorePlayer2];
};
const getColoredBoardLine = (board, num) => (
  chalk.bold(` ${board[num][0]} | ${board[num][1]} | ${board[num][2]} `)
);
const printBoard = (board) => {
  console.log(`\n${getColoredBoardLine(board, 0)}`);
  console.log(chalk.strikethrough.bold('-----|-----|-----'));
  console.log(`${getColoredBoardLine(board, 1)}`);
  console.log(chalk.strikethrough.bold('-----|-----|-----'));
  console.log(`${getColoredBoardLine(board, 2)}\n`);
};

const boardHasEmptyCell = (board, emptyCell) => {
  let freeSpaces = 9;
  board.forEach((lineArr) => lineArr.forEach((cell) => {
    if (cell !== emptyCell) freeSpaces -= 1;
  }));
  return freeSpaces > 0;
};

const checkDiagonal = (board, emptyCell, leftToRight) => {
  const firstСorner = leftToRight === true ? board[0][0] : board[0][2];
  const secondCorner = leftToRight === true ? board[2][2] : board[2][0];
  const centr = board[1][1];

  return firstСorner === centr && firstСorner === secondCorner && firstСorner !== emptyCell;
};

const checkWinner = (board, emptyCell) => {
  // check for rows
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== emptyCell) {
      return board[i][0];
    }
  } // check for column
  for (let i = 0; i < 3; i += 1) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== emptyCell) {
      return board[0][i];
    }
  } // check for diagonals
  if (checkDiagonal(board, emptyCell, true)) {
    return board[0][0];
  }
  if (checkDiagonal(board, emptyCell, false)) {
    return board[0][2];
  }
  return emptyCell;
};

const gameCanContinue = (winner, board, emptyCell) => (
  winner === emptyCell && boardHasEmptyCell(board, emptyCell));

const viewComputerWaiting = (charComputer, color) => {
  if (charComputer === color) {
    console.log('🤖 Компьютер думает...');
    pause(1200);
  }
};

// support fuctions for smart, random or very stupit AI

const getAvailableMoves = (board, emptyCell) => {
  const result = [];
  board.forEach((lineArr, indexLine) => lineArr.forEach((cell, indexCell) => {
    if (cell === emptyCell) result.push([indexLine, indexCell]);
  }));
  return result;
};

const gameIsOwer = (game, emptyCell) => (
  !gameCanContinue(checkWinner(game, emptyCell), game, emptyCell));

const getNewState = (board, move, activeTurn) => {
  const newGame = _.cloneDeep(board);
  newGame[move[0]][move[1]] = activeTurn;
  return newGame;
};

const everyCellsIsEmpty = (game, emptyCell) => (
  game.every((lineArr) => lineArr.every((cell) => cell === emptyCell) === true));

// AI move functions

const getComputerRandomMove = (board, emptyCell) => {
  let x;
  let y;

  do {
    x = getRandomInt(0, 2);
    y = getRandomInt(0, 2);
  } while (board[x][y] !== emptyCell);
  return [x, y];
};

const getFirstAiStep = (game, emptyCell, stupid) => (
  stupid ? getComputerRandomMove(game, emptyCell) : [1, 1]);

const getComputerAiMove = (board, emptyCell, charPlayer1, charComputer, stupid = false) => {
  const score = (game, depth) => {
    if (checkWinner(game, emptyCell) === charComputer) return 100 - depth;
    if (checkWinner(game, emptyCell) === charPlayer1) return depth - 100;
    return 0;
  };

  let choice = null;
  const minMax = (game, depth = 0) => {
    if (gameIsOwer(game, emptyCell)) {
      return score(game, depth);
    }
    if (everyCellsIsEmpty(game, emptyCell)) {
      choice = getFirstAiStep(game, emptyCell, stupid);
      return 0;
    }
    const activePlayer = depth === 0 || depth % 2 === 0 ? charComputer : charPlayer1;
    const scores = [];
    const moves = [];
    const availableMoves = getAvailableMoves(game, emptyCell);

    availableMoves.forEach((move) => {
      const possibleGame = getNewState(game, move, activePlayer);
      scores.push(minMax(possibleGame, depth + 1));
      moves.push(move);
    });

    if (activePlayer === (stupid === false ? charComputer : charPlayer1)) {
      const maxScoreIndex = scores.indexOf(_.max(scores));
      choice = moves[maxScoreIndex];
      return scores[maxScoreIndex];
    }

    const minScoreIndex = scores.indexOf(_.min(scores));
    choice = moves[minScoreIndex];
    return scores[minScoreIndex];
  };

  minMax(board);
  return choice;
};

const getStupidComputerAiMove = (board, emptyCell, charPlayer1, charComputer) => (
  getComputerAiMove(board, emptyCell, charPlayer1, charComputer, true));

export {
  checkWinner, gameCanContinue, printBoard, getComputerRandomMove, getComputerAiMove,
  viewComputerWaiting, getStupidComputerAiMove, colorStringPoints,
};
