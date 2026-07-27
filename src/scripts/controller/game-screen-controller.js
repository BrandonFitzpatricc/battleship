import { loadGameScreen } from "../view/game-screen";

import { GameHandler } from "../model/game-handler";
import { ComputerPlayer } from "../model/player";

import { initializeGameOverPrompt } from "./game-over-prompt-controller";
import { initializeSwitchingPlayersPrompt } from "./switching-players-prompt-controller";

const initializeGameScreen = () => {
  loadGameScreen();

  document
    .querySelector(".game-board.active")
    .addEventListener("click", (event) => {
      // Handling for bug where dragging on the board will trigger a click
      // event for the board itself.
      if (!event.target.className.includes("game-board")) {
        const currentAttackingPlayer = GameHandler.getAttackingPlayer();

        const playerCanAttack =
          !(currentAttackingPlayer instanceof ComputerPlayer) &&
          !GameHandler.isGameOver() &&
          !GameHandler.isSwitchingPlayers();

        if (playerCanAttack) {
          realPlayerAttack(
            event.target.dataset.row,
            event.target.dataset.column,
          );

          if (!GameHandler.isTwoPlayerGame()) {
            computerPlayerAttack();
          } else {
            // check if the players have switched
            if (GameHandler.isSwitchingPlayers()) {
              initializeSwitchingPlayersPrompt();
            }
          }
        }
      }
    });
};

function realPlayerAttack(row, column) {
  GameHandler.playRound(Number(row), Number(column));
  updateScreen();
}

function computerPlayerAttack() {
  const computerCanAttack =
    GameHandler.getAttackingPlayer() instanceof ComputerPlayer &&
    !GameHandler.isGameOver();

  if (computerCanAttack) {
    setTimeout(() => {
      GameHandler.playRound();
      updateScreen();
      computerPlayerAttack();
    }, 1000);
  }
}

function updateScreen() {
  initializeGameScreen();
  if (GameHandler.isGameOver()) {
    setTimeout(initializeGameOverPrompt, 2000);
  }
}

export { initializeGameScreen };
