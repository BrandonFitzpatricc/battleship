import { loadGameScreen } from "../view/game-screen";

import { GameHandler } from "../model/game-handler";
import { ComputerPlayer } from "../model/player";

import { initializeGameOverPrompt } from "./game-over-prompt-controller";

const initializeGameScreen = () => {
  loadGameScreen();

  document
    .querySelector(".game-board.active")
    .addEventListener("click", (event) => {
      // prettier-ignore
      if (!(GameHandler.getAttackingPlayer() instanceof ComputerPlayer) && !GameHandler.isGameOver()) {
        realPlayerAttack(event.target.dataset.row, event.target.dataset.column);
        computerPlayerAttack();
      }
    });
};

function realPlayerAttack(row, column) {
  GameHandler.playRound(Number(row), Number(column));
  updateScreen();
}

function computerPlayerAttack() {
  // prettier-ignore
  if (GameHandler.getAttackingPlayer() instanceof ComputerPlayer && !GameHandler.isGameOver()) {
    setTimeout(() => {
      GameHandler.playRound();
      updateScreen()
      computerPlayerAttack();
    }, 1000);
  }
}

function updateScreen() {
  initializeGameScreen();
  if (GameHandler.isGameOver()) initializeGameOverPrompt();
}

export { initializeGameScreen };
