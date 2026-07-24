import { loadGameScreen } from "../view/game-screen";

import { GameHandler } from "../model/game-handler";
import { ComputerPlayer } from "../model/player";

const initializeGameScreen = () => {
  loadGameScreen();

  document
    .querySelector(".game-board.active")
    .addEventListener("click", (event) => {
      if (!(GameHandler.getAttackingPlayer() instanceof ComputerPlayer)) {
        realPlayerAttack(event.target.dataset.row, event.target.dataset.column);
        computerPlayerAttack();
      }
    });
};

function realPlayerAttack(row, column) {
  GameHandler.playRound(Number(row), Number(column));
  initializeGameScreen();
}

function computerPlayerAttack() {
  // prettier-ignore
  if (GameHandler.getAttackingPlayer() instanceof ComputerPlayer && !GameHandler.isGameOver()) {
    setTimeout(() => {
      GameHandler.playRound();
      initializeGameScreen();
      computerPlayerAttack();
    }, 1000);
  }
}

export { initializeGameScreen };
