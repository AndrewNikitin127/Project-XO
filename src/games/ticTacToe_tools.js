import chalk from 'chalk';

const printBoard = (board) => {
  console.log(chalk.bold(`\n ${board[0][0]} | ${board[0][1]} | ${board[0][2]} `));
  console.log(chalk.strikethrough.bold('-----|-----|-----'));
  console.log(chalk.bold(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} `));
  console.log(chalk.strikethrough.bold('-----|-----|-----'));
  console.log(chalk.bold(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} \n`));
};

const boardHasEmptyCell = (board, emptyCell) => {
  let freeSpaces = 9;
  board.forEach((lineArr) => lineArr.forEach((cell) => {
    if (cell !== emptyCell) freeSpaces -= 1;
  }));
  return freeSpaces > 0;
};

const checkWinner = (board, emptyCell) => {
  // check for rows
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  } // check for column
  for (let i = 0; i < 3; i += 1) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  } // check for diagonals
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }
  return emptyCell;
};

const gameCanContinue = (winner, board, emptyCell) => (
  winner === emptyCell && boardHasEmptyCell(board, emptyCell));

export { checkWinner, gameCanContinue, printBoard };