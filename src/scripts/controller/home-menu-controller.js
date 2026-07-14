import { initializeIconSelectMenu } from "./icon-select-menu-controller.js";

import { loadHomeMenu } from "../view/home-menu.js";
import { Player, ComputerPlayer } from "../model/player.js";

const initializeHomeMenu = () => {
  loadHomeMenu();

  document.querySelector(".menu-btns").addEventListener("click", (event) => {
    if (event.target.id === "one-player") {
      initializeIconSelectMenu([new Player(), new ComputerPlayer()]);
    } else if (event.target.id === "two-player") {
      initializeIconSelectMenu([new Player(), new Player()]);
    }
  });
};

export { initializeHomeMenu };
