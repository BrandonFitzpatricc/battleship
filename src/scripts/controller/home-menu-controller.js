import { initializeIconSelectMenu } from "./icon-select-menu-controller.js";

import { loadHomeMenu } from "../view/home-menu.js";
import { Player, ComputerPlayer } from "../model/player.js";

const initializeHomeMenu = () => {
  loadHomeMenu();

  document.querySelector(".menu-btns").addEventListener("click", (event) => {
    const players =
      event.target.id === "one-player"
        ? [new Player(), new ComputerPlayer()]
        : [new Player(), new Player()];

    initializeIconSelectMenu(players, players[0]);
  });
};

export { initializeHomeMenu };
