import { loadGameScreen } from "../view/game-screen";

import { GameHandler } from "../model/game-handler";
import { ComputerPlayer } from "../model/player";

import { initializeGameOverPrompt } from "./game-over-prompt-controller";
import { initializeSwitchingPlayersPrompt } from "./switching-players-prompt-controller";

const initializeGameScreen = () => {
  loadGameScreen();

  const targetGameBoard = document.querySelector(".game-board.target");
  if (targetGameBoard) {
    targetGameBoard.addEventListener("click", (event) => {
      // Handling for bug where dragging on the board will trigger a click
      // event for the board itself.
      if (!event.target.className.includes("game-board")) {
        const currentAttackingPlayer = GameHandler.getAttackingPlayer();

        if (!(currentAttackingPlayer instanceof ComputerPlayer)) {
          realPlayerAttack(
            event.target.dataset.row,
            event.target.dataset.column,
          );

          if (!GameHandler.isTwoPlayerGame()) {
            computerPlayerAttack();
          } else {
            if (GameHandler.isSwitchingPlayers()) {
              setTimeout(initializeSwitchingPlayersPrompt, 750);
            }
          }
        }
      }
    });
  }
};

const countDownToStart = () => {
  const header = document.querySelector(".header");

  let countDown = 3;

  header.textContent = `Game Begins In ${countDown--}...`;
  let timer = setInterval(() => {
    header.textContent = `Game Begins In ${countDown--}...`;
    if (countDown < 0) {
      clearInterval(timer);
      GameHandler.startNewGame();
      initializeGameScreen();
    }
  }, 1000);
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

export { initializeGameScreen, countDownToStart };
