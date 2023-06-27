import selectAvatar from './avatars.js';
import {
  askQuestion, askAnswerIndex, printText, getColorArray, getColor, askQuestionRange,
} from './tools.js';

const askDifficulty = () => {
  const difficulties = ['easy', 'normal', 'hard'];
  const difficultiesColor = getColorArray(difficulties, '#B6E1FA');
  const index = askAnswerIndex(difficultiesColor, 'Выбери сложность:', '#EFC09D', false);
  return difficulties[index];
};

const greetingPlayer = (questionAboutName, textColor = '#71B0E8') => {
  const player = {};
  player.name = askQuestion(questionAboutName, textColor);
  printText(`Привет, ${player.name}, давай выберем тебе аватар:`, textColor);
  player.avatar = selectAvatar();
  return player;
};

const getRoundCount = () => {
  const question = getColor('Сколько раундов играем? ', '#EFC09D');
  const errorMessage = getColor('Число раундов должно быть целым положительным числом от 1 до 10 ', '#FF4F5A');
  const raunds = askQuestionRange(question, 1, 10, errorMessage);
  return raunds;
};

export default () => {
  printText('Добро пожаловать в игру крестики нолики. ', '#71B0E8');

  const modes = getColorArray(['Одиночная игра.', 'Игра на двоих.'], '#B6E1FA');
  const modeIndex = askAnswerIndex(modes, 'Выбери режим игры', '#71B0E8', false);
  const gameConf = { playerOne: null, playerTwo: null, mode: modeIndex === 0 ? 'A' : 'B' };

  gameConf.playerOne = greetingPlayer('Могу я узнать как вас зовут?');

  if (gameConf.mode === 'A') gameConf.playerOne.difficulty = askDifficulty();
  else gameConf.playerTwo = greetingPlayer('Как зовут второго игрока?');

  gameConf.roundCount = getRoundCount();
  return gameConf;
};
