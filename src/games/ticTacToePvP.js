/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import { askQuestionRange } from '../tools.js';
import chalk from 'chalk';


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

const gameCanContinue = (winner, board, emptyCell) => (
  winner === emptyCell && boardHasEmptyCell(board, emptyCell));

const checkWinner = (board, emptyCell) => {
  // check for rows
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  } // check for column
  for (let i = 0; i < 3; i += 1) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  } // check for diagonals
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }
  return emptyCell;
};

const printWinner = (winner, charPlayer1, charPlayer2, playerOneName, playerTwoName) => {
  if (winner === charPlayer1) {
    console.log(chalk.hex('#A1FFA3')(` победил ${playerOneName} `));
  } else if (winner === charPlayer2) {
    console.log(chalk.hex('#A1FFA3')(` победил ${playerTwoName}`));
  } else {
    console.log(chalk.hex('#71B0E8')('ничья'));
  }
};

const getPlayerMove1 = (board, emptyCell, playerOneName) => {
  let x;
  let y;
  do {
    console.log(chalk.hex('#71B0E8')(`ход игрока ${playerOneName}`));
    x = askQuestionRange(chalk.blue('ведите номер строки #(1-3): '), 1, 3) - 1;
    y = askQuestionRange(chalk.blue('ведите номер ячейки #(1-3): '), 1, 3) - 1;

    if (board[x][y] !== emptyCell) console.log(chalk.hex('#DA104C')('Ячейка уже занята'));
  } while (board[x][y] !== emptyCell);
  return [x, y];
};

const getPlayerMove2 = (board, emptyCell, playerTwoName) => {
  let a;
  let z;
  do {
    console.log(chalk.hex('#EFC09D')(`ход игрока ${playerTwoName}`));
    a = askQuestionRange(chalk.hex('#B6E1FA')('ведите номер строки #(1-3): '), 1, 3) - 1;
    z = askQuestionRange(chalk.hex('#B6E1FA')('ведите номер ячейки #(1-3): '), 1, 3) - 1;

    if (board[a][z] !== emptyCell) console.log(chalk.hex('#DA104C')('Ячейка уже занята'));
  } while (board[a][z] !== emptyCell);
  return [a, z];
};

export default (gameConf) => {
  gameConf.mode;
  const playerOneName = gameConf.playerOne.name;
  const playerTwoName = gameConf.playerTwo.name;
  const emptyCell = '   ';
  const board = [
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
  ];
  const charPlayer1 = chalk.hex('#CDB861')(' X ');
  const charPlayer2 = chalk.hex('#C38CD0')(' 0 ');
  let winner = emptyCell;

  while (gameCanContinue(winner, board, emptyCell)) {
    printBoard(board);
    const [x, y] = getPlayerMove1(board, emptyCell, playerOneName);
    board[x][y] = charPlayer1;
    winner = checkWinner(board, emptyCell);
    if (!gameCanContinue(winner, board, emptyCell)) break;
    printBoard(board);
    const [a, z] = getPlayerMove2(board, emptyCell, playerTwoName);
    board[a][z] = charPlayer2;
    winner = checkWinner(board, emptyCell);
    if (!gameCanContinue(winner, board, emptyCell)) break;
  }
  printBoard(board);
  printWinner(winner, charPlayer1, charPlayer2, playerOneName, playerTwoName);
};
