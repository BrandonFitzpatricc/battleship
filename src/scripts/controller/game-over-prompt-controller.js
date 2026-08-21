import { initializeShipPlacementMenu } from "./ship-placement-menu-controller";
import { initializeHomeMenu } from "./home-menu-controller";

import { getPlayers } from "../model/game-handler";
import { GameBoard } from "../model/game-board";

const gameOverPrompt = document.querySelector("#game-over-prompt");

const initializeGameOverPrompt = () => {
  gameOverPrompt.showModal();
  initializePromptBtns();
};

function initializePromptBtns() {
  const content = gameOverPrompt.querySelector(".content");

  const promptBtnHandler = {
    "play-again": () => {
      const players = getPlayers();
      initializeShipPlacementMenu(players, players[0], new GameBoard());
    },

    "back-to-menu": () => {
      initializeHomeMenu();
    },

    "close-prompt": () => {
      content.querySelectorAll(".text-btn").forEach((btn) => {
        const btnClone = btn.cloneNode(true);
        addPromptBtnEventListener(btnClone);
        document.querySelector(".header").prepend(btnClone);
      });
    },
  };

  content
    .querySelectorAll("button")
    .forEach((button) => addPromptBtnEventListener(button));

  function addPromptBtnEventListener(promptBtn) {
    promptBtn.addEventListener("click", () => {
      promptBtnHandler[promptBtn.id]();
      gameOverPrompt.close();
    });
  }
}

export { initializeGameOverPrompt };
