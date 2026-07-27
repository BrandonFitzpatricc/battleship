import { GameHandler } from "../model/game-handler";
import { loadSwitchingPlayersPrompt } from "../view/switching-players-prompt";
import { initializeGameScreen } from "./game-screen-controller";

const initializeSwitchingPlayersPrompt = () => {
  loadSwitchingPlayersPrompt();

  document.querySelector("#continue-btn").addEventListener("click", () => {
    GameHandler.endSwitchingPlayers();
    document.body.removeChild(document.querySelector(".prompt"));
    initializeGameScreen();
  });
};

export { initializeSwitchingPlayersPrompt };
