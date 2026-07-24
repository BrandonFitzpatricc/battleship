import { loadIconSelectMenu } from "../view/icon-select-menu.js";
import { playerIcons } from "../view/icon-manager.js";

import { initializeShipPlacementMenu } from "./ship-placement-menu-controller.js";

import { GameBoard } from "../model/game-board.js";
import { ComputerPlayer } from "../model/player.js";

const initializeIconSelectMenu = (players, currentPlayer) => {
  loadIconSelectMenu();

  const iconSelectionBtns = document.querySelector(".icon-selection-btns");

  iconSelectionBtns.querySelectorAll(".selection-btn").forEach((iconBtn) => {
    if (players[0].icon === playerIcons[iconBtn.id]) {
      iconBtn.disabled = true;
    }
  });

  if (currentPlayer instanceof ComputerPlayer) {
    currentPlayer.icon = selectRandomIcon();
    initializeShipPlacementMenu(players, new GameBoard());
    return;
  }

  let selectedIcon = !document.querySelector("#boxing-glove").disabled
    ? selectIcon(document.querySelector("#boxing-glove"))
    : selectIcon(document.querySelector("#butterfly"));

  iconSelectionBtns.addEventListener("click", (event) => {
    selectedIcon = selectIcon(event.target);
  });

  document.querySelector("#random-icon").addEventListener("click", () => {
    selectedIcon = selectRandomIcon();
  });

  document.querySelector("#confirm").addEventListener("click", () => {
    currentPlayer.icon = selectedIcon;
    if (currentPlayer === players[0]) {
      initializeIconSelectMenu(players, players[1]);
    } else {
      initializeShipPlacementMenu(players, new GameBoard());
    }
  });

  function selectIcon(iconBtn) {
    clearSelectedIcon();
    iconBtn.className += " selected";
    return playerIcons[iconBtn.id];
  }

  function selectRandomIcon() {
    // prettier-ignore
    const icons = iconSelectionBtns.querySelectorAll(".selection-btn:not(:disabled)");
    return selectIcon(icons[Math.floor(Math.random() * icons.length)]);
  }

  function clearSelectedIcon() {
    // prettier-ignore
    const selectedIcon = iconSelectionBtns.querySelector(".selection-btn.selected");
    if (selectedIcon) selectedIcon.className = "selection-btn";
  }
};

export { initializeIconSelectMenu };
