import readlineSync from 'readline-sync';
import chalk from 'chalk';

const avatarCat = [chalk.white.bold('  (\\__/)\n  (=‘.’=)\nE[:]|||||[:]З\n  (“)_(”)'),
  chalk.cyanBright.bold('/\\_/\\\n((@v@))\n():::()\n VV-VV'),
  chalk.red.bold('/\\_/\\\n( o.o )\n > ^ <'),
  chalk.green.bold('((...))\n ( o o )\n  \\   /\n   ^_^'),
  chalk.yellowBright.bold('_   _\n(_)_(_)\n (o o)\n==\\o/=='),
  chalk.blue.bold('((_,...,_))\n    |o o|\n    \\   /\n     ^_^'),
  chalk.magentaBright.bold('__    __\n/ \\\\..// \\\n  ( oo )\n   \\__/')];

const selectAvatar = () => {
  const indexAvatar = readlineSync.keyInSelect(avatarCat, chalk.hex('#EFC09D')('Выбери аватарку:'));
  return `\n ${avatarCat[indexAvatar]}`;
};

export default selectAvatar;
