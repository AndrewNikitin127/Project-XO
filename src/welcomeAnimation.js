import chalkAnimation from 'chalk-animation';

/* eslint-disable */
const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
/* eslint-enable */

async function clearConsole() {
  console.clear();
}

async function welcome() {
  const gameTitleAnimation = chalkAnimation.karaoke(`

#   # ####  #####  #### ##### #   # #   # #   #           #   #  ###   #### #   # #   # #   # 
#  #  #   # #     #       #   #  ## #  #  #  ##           #   # #   #  #  # #  ## #  #  #  ## 
###   ####  ####  #       #   # # # ###   # # #    ###    ##### #   #  #  # # # # ###   # # # 
#  #  #     #     #       #   ##  # #  #  ##  #           #   # #   #  #  # ##  # #  #  ##  # 
#   # #     #####  ####   #   #   # #   # #   #           #   #  ###  #   # #   # #   # #   # 

`, 2);

  await sleep();
  gameTitleAnimation.stop();
}

await clearConsole();
await welcome();

export default welcome;
