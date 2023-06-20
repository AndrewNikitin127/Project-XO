import chalk from 'chalk';
import { askQuestionRange, getRandomInt } from '../tools.js';
import { checkWinner, gameCanContinue, printBoard } from './ticTacToe_tools.js';

function printWinner(winner, charPlayer1, charPlayer2, gameConf) {
  if (winner === charPlayer1) {
    console.log(chalk.hex('#A1FFA3')(`${gameConf.playerOne.name}\n${gameConf.playerOne.avatar}\nПоздравляем с победой!!! `));
  } else if (winner === charPlayer2) {
    console.log(chalk.hex('#A1FFA3')(`${gameConf.playerTwo.name}\n${gameConf.playerTwo.avatar}\nПоздравляем с победой!!!`));
  } else {
    console.log(chalk.hex('#71B0E8')('ничья'));
  }
}

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
  const playerOneName = gameConf.playerOne.name;
  const playerTwoName = gameConf.playerTwo.name;
  const emptyCell = '   ';
  const board = [
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
  ];
  const colorX = chalk.hex('#CDB861')(' X ');
  const colorY = chalk.hex('#C38CD0')(' 0 ');

  const charPlayer1 = getRandomInt(0, 1) === 0 ? colorX : colorY;
  const charPlayer2 = charPlayer1 === colorX ? colorY : colorX;

  const getMove = (color) => (charPlayer1 === color
    ? getPlayerMove1 : getPlayerMove2);

  const move = {
    first: getMove(colorX),
    second: getMove(colorY),
  };

  let winner = emptyCell;

  while (gameCanContinue(winner, board, emptyCell)) {
    printBoard(board);
    const [x, y] = move.first(board, emptyCell, playerOneName);
    board[x][y] = charPlayer1;
    winner = checkWinner(board, emptyCell);
    if (!gameCanContinue(winner, board, emptyCell)) break;
    printBoard(board);
    const [a, z] = move.second(board, emptyCell, playerTwoName);
    board[a][z] = charPlayer2;
    winner = checkWinner(board, emptyCell);
    if (!gameCanContinue(winner, board, emptyCell)) break;
  }
  printBoard(board);
  printWinner(winner, charPlayer1, charPlayer2, gameConf);
};
