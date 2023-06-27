import readlineSync from 'readline-sync';
import chalk from 'chalk';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getColor = (text, color) => chalk.hex(color)(text);
const getColorArray = (arr, color) => arr.map((e) => getColor(e, color));

const askQuestionRange = (question, begin, end, errorMessage = '') => {
  const defaultErrorMessage = getColor('Извините, $<lastInput> не подходит.', '#DA104C');
  const messageErr = errorMessage === '' ? defaultErrorMessage : errorMessage;
  const tempArr = [];
  for (let i = begin; i <= end; i += 1) {
    tempArr.push(i.toString());
  }
  const regExpValue = `^(${tempArr.join('|')})$`;
  return +readlineSync.question(question, {
    limit: new RegExp(regExpValue),
    limitMessage: messageErr,
  });
};

const printText = (text, textColor) => console.log(chalk.hex(textColor)(text));

const askQuestion = (questionText, textColor) => (
  readlineSync.question(chalk.hex(textColor)(`${questionText} `)));

const askAnswerIndex = (variants, questionText, textColor, cancelVariant = true) => (
  readlineSync.keyInSelect(variants, chalk.hex(textColor)(`${questionText} `), { cancel: cancelVariant }));

// Функция добавляет паузу перед выполнением следующей
// pause(2000) - пауза 2 секунды
const pause = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export {
  getRandomInt, askQuestionRange, pause, askQuestion, askAnswerIndex, printText, getColor,
  getColorArray,
};
