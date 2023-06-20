import readlineSync from 'readline-sync';
import chalk from 'chalk';
import selectAvatar from './avatars.js';

const askDifficulty = () => {
  const difficulties = ['easy', 'normal', 'hard'];
  const index = readlineSync.keyInSelect(difficulties, chalk.hex('#71B0E8')('Выбери сложность:'), { cancel: false });
  return difficulties[index];
};

const greetingOnePlayer = () => {
  const playerOne = {};
  playerOne.name = readlineSync.question(chalk.hex('#71B0E8')('Могу я узнать как вас зовут? '));
  playerOne.difficulty = askDifficulty();
  console.log(chalk.hex('#71B0E8')(`Привет, ${playerOne.name}, давай выберем тебе аватар:`));
  playerOne.avatar = selectAvatar();
  return playerOne;
};

const greetingTwoPlayers = () => {
  const playerTwo = {};
  playerTwo.name = readlineSync.question(chalk.hex('#71B0E8')('Как зовут второго игрока? '));
  console.log(chalk.hex('#71B0E8')(`Привет, '${playerTwo.name}, давай выберем тебе аватар:`));
  playerTwo.avatar = selectAvatar();
  return playerTwo;
};

export default () => {
  console.log(chalk.hex('#71B0E8')('Добро пожаловать в игру крестики нолики. Выбери режим игры A или B.'));
  console.log(chalk.hex('#B6E1FA')('A - Одиночная игры. \nB - Игра на двоих.'));

  const gameConf = { playerOne: null, playerTwo: null, mode: null };

  while (gameConf.mode !== 'A' && gameConf.mode !== 'B') {
    gameConf.mode = readlineSync.question(chalk.hex('#71B0E8')('Введите букву (A или B) ')).toLocaleUpperCase();
    if (gameConf.mode === 'A') {
      gameConf.playerOne = greetingOnePlayer();
      break;
    } else if (gameConf.mode === 'B') {
      gameConf.playerOne = greetingOnePlayer();
      gameConf.playerTwo = greetingTwoPlayers();
      break;
    } else {
      console.log(chalk.hex('#FF4F5A')('Ошибка: Выберите режим игры (Введите A или B)'));
    }
  }
  return gameConf;
};
