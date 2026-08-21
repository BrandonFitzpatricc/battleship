import { loadGameScreen } from "../view/game-screen";

import { ComputerPlayer } from "../model/player";

import {
  getAttackingPlayer,
  isSwitchingPlayers,
  isGameOver,
  isTwoPlayerGame,
  startNewGame,
  playRound,
} from "../model/game-handler";

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
        const currentAttackingPlayer = getAttackingPlayer();

        if (!(currentAttackingPlayer instanceof ComputerPlayer)) {
          realPlayerAttack(
            event.target.dataset.row,
            event.target.dataset.column,
          );

          if (!isTwoPlayerGame()) {
            computerPlayerAttack();
          } else {
            if (isSwitchingPlayers()) {
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
      startNewGame();
      initializeGameScreen();
    }
  }, 1000);
};

function realPlayerAttack(row, column) {
  playRound(Number(row), Number(column));
  updateScreen();
}

function computerPlayerAttack() {
  const computerCanAttack =
    getAttackingPlayer() instanceof ComputerPlayer && !isGameOver();

  if (computerCanAttack) {
    setTimeout(() => {
      playRound();
      updateScreen();
      computerPlayerAttack();
    }, 1000);
  }
}

function updateScreen() {
  initializeGameScreen();
  if (isGameOver()) {
    setTimeout(initializeGameOverPrompt, 2000);
  }
}

export { initializeGameScreen, countDownToStart };
