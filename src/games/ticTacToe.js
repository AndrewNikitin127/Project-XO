import chalk from 'chalk';
import gradient from 'gradient-string';
import { askQuestionRange, getRandomInt, pause } from '../tools.js';
import {
  checkWinner, gameCanContinue, printBoard, getComputerRandomMove, getComputerAiMove,
  viewComputerWaiting, getStupidComputerAiMove,
} from './ticTacToe_tools.js';

// не уверен, что счет должен вестись здесь
const gameScore = [0, 0];

const printScoreboard = (score, name) => {
  const playerName = (name === '') ? 'Человек' : name;

  let humanScore;
  let computerScore;

  if (score[0] > score[1]) {
    humanScore = chalk.green(`${playerName} ${score[0]}`);
    computerScore = chalk.red(`${score[1]} Компьютер`);
  } else if (score[0] < score[1]) {
    humanScore = chalk.red(`${playerName} ${score[0]}`);
    computerScore = chalk.green(`${score[1]} Компьютер`);
  } else {
    humanScore = chalk.hex('#B6E1FA')(`${playerName} ${score[0]}`);
    computerScore = chalk.hex('#B6E1FA')(`${score[1]} Компьютер`);
  }

  console.log(`
${chalk.hex('#71B0E8')('Счет игры')}
${humanScore} ${chalk.hex('#B6E1FA')(':')} ${computerScore}`);
};

const printWinner = (winner, charPlayer1, charComputer, playerOneName, playerOneAvatar) => {
  const userName = (playerOneName === '') ? '' : `${playerOneName}, `;

  if (winner === charPlayer1) {
    console.log(chalk.hex('#A1FFA3')(`${userName}вы выиграли раунд!\n${playerOneAvatar}`));
  } else if (winner === charComputer) {
    console.log(chalk.hex('#FF4F5A')('вы проиграли раунд\n'));
  } else {
    console.log(chalk.hex('#71B0E8')('раунд закончился ничьей\n'));
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
    console.log(`${chalk.hex('#71B0E8')('Текущий раунд:')} ${chalk.hex('#B6E1FA')(currentRound + 1)}`);
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
    console.log(`${chalk.hex('#71B0E8')('Текущий раунд:')} ${chalk.hex('#B6E1FA')(currentRound + 1)}`);
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
  console.log(`${chalk.hex('#71B0E8')('Текущий раунд:')} ${chalk.hex('#B6E1FA')(currentRound + 1)}`);
  printScoreboard(gameScore, name);
  printBoard(board);
  printWinner(winner, charPlayer1, charComputer, name, avatar);

  if (currentRound === gameConf.roundCount - 1) {
    pause(3000);
    console.clear();
    console.log(chalk.hex('#71B0E8')('Игра закончена!'));
    printScoreboard(gameScore, name);
    pause(1000);
    console.log();
    if (gameScore[0] > gameScore[1]) {
      const text = name === '' ? 'Вы победили!\n' : `${name}, Вы победили!\n`;
      console.log(chalk.hex('#A1FFA3')(text));
      console.log(avatar);
      console.log(gradient.pastel('Поздравляем с победой!!!!\n\n\n'));
      pause(2000);
    }
  }
};
