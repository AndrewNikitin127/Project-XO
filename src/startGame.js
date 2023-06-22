import ticTacToe from './games/ticTacToe.js';
import ticTacToePvP from './games/ticTacToePvP.js';
import greeting from './greeting.js';
import getGameBreak from './getGameBreak.js';
import showWelcomeAnimation from './welcomeAnimation.js';

export default async () => {
  await showWelcomeAnimation();

  const gameConf = greeting();
  // console.log(gameConf.mode);

  for (let currentRound = 0; currentRound < gameConf.roundCount; currentRound += 1) {
    if (gameConf.mode === 'B') {
      ticTacToePvP(gameConf, currentRound);
    } else {
      ticTacToe(gameConf, currentRound);
    }

    if (currentRound < gameConf.roundCount - 1) {
      const breakBetweenRounds = getGameBreak();
      if (breakBetweenRounds === 'exit') {
        console.log('Игра завершена досрочно');
        return;
      }
    } else if (gameConf.mode === 'B') {
      console.log('сообщение для режима PvP');
    } else {
      console.log('сообщение для режима PvC');
    }
  }
};

/* тут будут основное меню после запуска игры, так же
   если наша игра будет подтягиваться как пакет в другом проекте
   то стартовать будет от сюда. этот файл является точкой входа программы, */
