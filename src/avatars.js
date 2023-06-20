import readlineSync from 'readline-sync';
import chalk from 'chalk';

const cat = `Котозаяц с баяном
  (\\___/)
  (=‘.’=)
E[:]|||||[:]З
  (“)_(”)
`;
const whiteCat = chalk.white.bold(cat);

const owl = `Совозавр Кекс
  /\\_/\\
 ((@v@))
 ():::()
  VV-VV
`;
const cyanBrightOwl = chalk.cyanBright.bold(owl);

const anotherCat = `Красный кот
  /\\_/\\
 ( o.o )
  > ^ <
`;
const redCat = chalk.red.bold(anotherCat);

const cow = `Зеленый травожуй
 ((...))
 ( o o )
  \\   /
   ^_^
`;
const greenCow = chalk.green.bold(cow);

const mouse = `Джерри
  _   _
 (_)_(_)
  (o o)
 ==\\o/==
`;
const yellowMouse = chalk.yellowBright.bold(mouse);

const moose = `Пурпурный Лосяш
 ((_,...,_))
    |o o|
    \\   /
     ^_^
`;
const purpleMoose = chalk.blue.bold(moose);

const somebody = `Удивленный вислоух
 __    __
/ \\\\..// \\
  ( oo )
   \\__/
`;
const pinkSomebody = chalk.magentaBright.bold(somebody);

const avatars = [whiteCat, cyanBrightOwl, redCat, greenCow, yellowMouse, purpleMoose, pinkSomebody];

const selectAvatar = () => {
  const avatarIndex = readlineSync.keyInSelect(avatars, chalk.hex('#EFC09D')('Выбери аватарку:'));
  return `${avatars[avatarIndex]}`;
};

export default selectAvatar;
