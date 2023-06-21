import readlineSync from 'readline-sync';
import chalk from 'chalk';

const getGameBreak = () => {
  let action;
  // console.log(action);

  while (action !== '' && action !== 'exit') {
    action = readlineSync.question('Нажмите Enter, чтобы играть следующий раунд ').toLowerCase();
    // console.log(action);

    if (action === '' || action === 'exit') {
      break;
    } else {
      console.log(chalk.hex('#FF4F5A')('Нажмите Enter, чтобы играть следующий раунд. Введите exit чтобы выйти'));
    }
  }

  return action;
};

export default getGameBreak;