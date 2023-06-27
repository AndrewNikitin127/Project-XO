import chalk from 'chalk';
import { askAnswerIndex } from './tools.js';

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
  const avatarIndex = askAnswerIndex(avatars, 'Выбери аватарку:', '#EFC09D');
  if (avatarIndex === -1) return '';
  const avatar = avatars[avatarIndex];
  return avatar.substring(avatar.indexOf('\n') + 1);
};

export default selectAvatar;
