import { loadIconSelectMenu } from "../view/icon-select-menu.js";

import { playerIcons } from "../view/icon-manager.js";

import { initializeShipPlacementMenu } from "./ship-placement-menu-controller.js";

const initializeIconSelectMenu = (players) => {
  loadIconSelectMenu();

  let selectedIcon = playerIcons["boxing-glove"];
  document.querySelector("#boxing-glove").className += " selected";

  const iconSelectionBtns = document.querySelector(".icon-selection-btns");

  iconSelectionBtns.addEventListener("click", (event) => {
    selectIcon(event.target);
  });

  document
    .querySelector("#random-icon")
    .addEventListener("click", selectRandomIcon);

  document.querySelector("#confirm").addEventListener("click", () => {
    players[0].icon = selectedIcon;
    initializeShipPlacementMenu(players);
  });

  function selectIcon(icon) {
    selectedIcon = playerIcons[icon.id];
    clearSelectedIcon();
    icon.className += " selected";
  }

  function selectRandomIcon() {
    const icons = iconSelectionBtns.querySelectorAll(".selection-btn");
    selectIcon(icons[Math.floor(Math.random() * icons.length)]);
  }

  function clearSelectedIcon() {
    // prettier-ignore
    const selectedIcon = iconSelectionBtns.querySelector(".selection-btn.selected");
    if (selectedIcon) selectedIcon.className = "selection-btn";
  }
};

export { initializeIconSelectMenu };
