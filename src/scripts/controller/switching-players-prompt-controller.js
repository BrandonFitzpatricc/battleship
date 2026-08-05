import { GameHandler } from "../model/game-handler";
import { initializeGameScreen } from "./game-screen-controller";

const initializeSwitchingPlayersPrompt = () => {
  // prettier-ignore
  const switchingPlayersPrompt = document.querySelector("#switching-players-prompt");

  switchingPlayersPrompt.showModal();

  switchingPlayersPrompt
    .querySelector("#continue")
    .addEventListener("click", () => {
      GameHandler.endSwitchingPlayers();
      switchingPlayersPrompt.close();
      initializeGameScreen();
    });
};

export { initializeSwitchingPlayersPrompt };
