import chalk from 'chalk';
import { askQuestionRange, getRandomInt } from '../tools.js';
import {
  checkWinner, gameCanContinue, printBoard, getComputerRandomMove, getComputerAiMove,
  viewComputerWaiting, getStupidComputerAiMove,
} from './ticTacToe_tools.js';

// не уверен, что счет должен вестись здесь
const gameScore = [0, 0];

const printScoreboard = (score, playerName) => {
  let humanScore;

  if (score[0] > score[1]) {
    humanScore = chalk.green(`${playerName} ${score[0]}`);
  } else if (score[0] < score[1]) {
    humanScore = chalk.red(`${playerName} ${score[0]}`);
  } else {
    humanScore = chalk.yellow(`${playerName} ${score[0]}`);
  }

  console.log(`\nСчет игры\n${humanScore} : ${score[1]} Компьютер`);
};

const printWinner = (winner, charPlayer1, charComputer, playerOneName, playerOneAvatar) => {
  if (winner === charPlayer1) {
    console.log(chalk.hex('#A1FFA3')(`    ${playerOneName}\n${playerOneAvatar}\nПоздравляем с победой!!!`));
  } else if (winner === charComputer) {
    console.log(chalk.hex('#FF4F5A')('вы проиграли'));
  } else {
    console.log(chalk.hex('#71B0E8')('ничья'));
  }
};

const getPlayerMove = (board, emptyCell) => {
  let x;
  let y;
  do {
    console.log(chalk.hex('#EFC09D')('ваш ход\n'));
    x = askQuestionRange(chalk.hex('#B6E1FA')('Введите номер строки #(1-3): '), 1, 3) - 1;
    y = askQuestionRange(chalk.hex('#B6E1FA')('Введите номер ячейки #(1-3): '), 1, 3) - 1;

    if (board[x][y] !== emptyCell) console.log(chalk.hex('#DA104C')('Ячейка уже занята'));
  } while (board[x][y] !== emptyCell);
  return [x, y];
};
const computerMove = {
  normal: getComputerRandomMove,
  easy: getStupidComputerAiMove,
  hard: getComputerAiMove,
};

export default (gameConf, currentRound) => {
  const emptyCell = '   ';
  const board = [
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
  ];
  const colorX = chalk.hex('#CDB861').bold(' X ');
  const colorY = chalk.hex('#C38CD0').bold(' 0 ');

  const charPlayer1 = getRandomInt(0, 1) === 0 ? colorX : colorY;
  const charComputer = charPlayer1 === colorX ? colorY : colorX;

  const { name, avatar, difficulty } = gameConf.playerOne;

  const getMove = (color) => (charPlayer1 === color
    ? getPlayerMove : computerMove[difficulty]);

  const move = {
    first: getMove(colorX),
    second: getMove(colorY),
  };

  let winner = emptyCell;
  while (gameCanContinue(winner, board, emptyCell)) {
    console.clear();
    console.log(`Текущий раунд: ${currentRound + 1}`);
    printScoreboard(gameScore, name);
    printBoard(board);
    viewComputerWaiting(charComputer, colorX);
    const [x, y] = move.first(board, emptyCell, charPlayer1, charComputer);
    board[x][y] = colorX;
    winner = checkWinner(board, emptyCell);
    if (winner === charPlayer1) {
      gameScore[0] += 1;
    } else if (winner === charComputer) {
      gameScore[1] += 1;
    }

    if (!gameCanContinue(winner, board, emptyCell)) break;

    console.clear();
    console.log(`Текущий раунд: ${currentRound + 1}`);
    printScoreboard(gameScore, name);
    printBoard(board);
    viewComputerWaiting(charComputer, colorY);
    const [a, z] = move.second(board, emptyCell, charPlayer1, charComputer);
    board[a][z] = colorY;
    winner = checkWinner(board, emptyCell);
    if (winner === charPlayer1) {
      gameScore[0] += 1;
    } else if (winner === charComputer) {
      gameScore[1] += 1;
    }

    if (!gameCanContinue(winner, board, emptyCell)) break;
  }
  console.clear();
  console.log(`Текущий раунд: ${currentRound + 1}`);
  printScoreboard(gameScore, name);
  printBoard(board);
  printWinner(winner, charPlayer1, charComputer, name, avatar);
};
