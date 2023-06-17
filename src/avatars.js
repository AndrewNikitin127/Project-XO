import readlineSync from 'readline-sync';
import chalk from 'chalk';

const avatarCat = [chalk.white('  (\\__/)\n  (=‘.’=)\nE[:]|||||[:]З\n  (“)_(”)'),
  (chalk.hex('#FF8923')("`(“).(”)\n`(’ o ') \n (“) `(”)\n(“”)-(“”)"))];

const selectAvatar = () => {
  const indexAvatar = readlineSync.keyInSelect(avatarCat, chalk.hex('#EFC09D')('Выбери аватарку:'));
  return `\n ${avatarCat[indexAvatar]}`;
};

export default selectAvatar;
