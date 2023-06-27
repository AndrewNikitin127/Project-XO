import chalk from 'chalk';
import _ from 'lodash';
import { getRandomInt, pause } from '../tools.js';

// support functions

const printBoard = (board) => {
  console.log(chalk.bold(`\n ${board[0][0]} | ${board[0][1]} | ${board[0][2]} `));
  console.log(chalk.strikethrough.bold('-----|-----|-----'));
  console.log(chalk.bold(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} `));
  console.log(chalk.strikethrough.bold('-----|-----|-----'));
  console.log(chalk.bold(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} \n`));
};

const boardHasEmptyCell = (board, emptyCell) => {
  let freeSpaces = 9;
  board.forEach((lineArr) => lineArr.forEach((cell) => {
    if (cell !== emptyCell) freeSpaces -= 1;
  }));
  return freeSpaces > 0;
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
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== emptyCell) {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== emptyCell) {
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
  viewComputerWaiting, getStupidComputerAiMove,
};
