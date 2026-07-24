import { loadGameOverPrompt } from "../view/game-over-prompt";

import { initializeShipPlacementMenu } from "./ship-placement-menu-controller";
import { initializeHomeMenu } from "./home-menu-controller";

import { GameHandler } from "../model/game-handler";
import { GameBoard } from "../model/game-board";

const initializeGameOverPrompt = () => {
  loadGameOverPrompt();
  initializePromptBtns();
};

function initializePromptBtns() {
  const content = document.querySelector(".content");

  const promptBtnHandler = {
    "play-again": () => {
      initializeShipPlacementMenu(GameHandler.getPlayers(), new GameBoard());
    },

    "back-to-menu": () => {
      initializeHomeMenu();
    },

    "close-prompt": () => {
      content.querySelectorAll(".text-btn").forEach((btn) => {
        document.querySelector(".header").prepend(btn);
      });

      document.body.removeChild(document.querySelector(".prompt"));
    },
  };

  content.querySelectorAll("button").forEach((button) =>
    button.addEventListener("click", (event) => {
      promptBtnHandler[event.target.id]();
    }),
  );
}

export { initializeGameOverPrompt };
