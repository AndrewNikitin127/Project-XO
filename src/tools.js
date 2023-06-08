import readlineSync from 'readline-sync';
// тут храним и экспортируем
// самописные функции, и константы, которые используем больше чем в одном файле

/**
 * @param {num} min @param {num} max @returns {num} random number */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * displays the text and asks you to enter a number in the range
 * @param {string} question @param {int} begin @param {int} end
 * @returns {int} number from the user */
const askQuestionRange = (question, begin, end) => +readlineSync.question(question, {
  limit: new RegExp(`^[${begin}-${end}]$`),
  limitMessage: 'Извините, $<lastInput> не подходит.',
});

export { getRandomInt, askQuestionRange };
