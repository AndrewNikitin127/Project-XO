import readlineSync from 'readline-sync';
import chalk from 'chalk';

const avatarCat = ['  (\\___/)\n   (=‘.’=)\nE[:]|||||[:]З\n   (“)_(”)',
  '/\\_/\\\n((@v@))\n():::()\n VV-VV',
  '/\\_/\\\n( o.o )\n > ^ <',
  '((...))\n ( o o )\n  \\   /\n   ^_^',
  '_   _\n(_)_(_)\n (o o)\n==\\o/==',
  '((_,...,_))\n    |o o|\n    \\   /\n     ^_^',
  '__    __\n/ \\\\..// \\\n  ( oo )\n   \\__/'];

const selectAvatar = () => {
  const indexAvatar = readlineSync.keyInSelect(avatarCat, chalk.hex('#EFC09D')('Выбери аватарку:'));
  return `\n ${avatarCat[indexAvatar]}`;
};

export default selectAvatar;
