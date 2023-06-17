import readlineSync from 'readline-sync';
import chalk from 'chalk';

const avatarCat = [chalk.white('  (\\__/)\n  (=‘.’=)\nE[:]|||||[:]З\n  (“)_(”)'),
  (chalk.cyanBright('/\\_/\\\n((@v@))\n():::()\n VV-VV')),
  chalk.red('/\\_/\\\n( o.o )\n > ^ <'),
  chalk.green('((...))\n ( o o )\n  \\   /\n   ^_^'),
  chalk.yellowBright('_   _\n(_)_(_)\n (o o)\n==\\o/=='),
  chalk.blue('((_,...,_))\n    |o o|\n    \\   /\n     ^_^'),
  chalk.magentaBright('__    __\n/ \\\\..// \\\n  ( oo )\n   \\__/')];

const selectAvatar = () => {
  const indexAvatar = readlineSync.keyInSelect(avatarCat, chalk.hex('#EFC09D')('Выбери аватарку:'));
  return `\n ${avatarCat[indexAvatar]}`;
};

export default selectAvatar;
