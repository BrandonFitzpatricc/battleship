import {
  createElement,
  createTextElement,
  createIconBtn,
  createPlayerIcon,
  createGameBoard,
} from "./element-factory.js";

import { buttonIcons } from "./icon-manager.js";

const loadShipPlacementMenu = (player) => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "ship-placement-menu");

  const header = loadHeader(player);
  const shipContainer = loadShipContainer();
  const gameBoard = createGameBoard();
  const optionBtns = loadOptionBtns();

  mainContainer.append(header, shipContainer, gameBoard, optionBtns);

  document.body.appendChild(mainContainer);
};

function loadHeader(player) {
  const header = createTextElement("div", "header");

  const playerIcon = createPlayerIcon(player.icon, 60);
  // prettier-ignore
  const shipPlacementMessage = createTextElement("div", "", " - Place Your Ships")

  header.append(playerIcon, shipPlacementMessage);

  return header;
}

function loadShipContainer() {
  const shipContainer = createElement("div", "ship-container");

  ["carrier", "battleship", "destroyer", "submarine", "patrol-boat"].forEach(
    (shipName) => {
      const ship = createElement("div", `ship ${shipName} vertical`);
      shipContainer.appendChild(ship);
    },
  );

  return shipContainer;
}

function loadOptionBtns() {
  const optionBtns = createElement("ul", "option-btns");

  for (const iconName in buttonIcons) {
    const icon = buttonIcons[iconName];

    // prettier-ignore
    const iconBtn = createIconBtn("option-btn", iconName, icon, 120);

    optionBtns.append(iconBtn);
  }

  return optionBtns;
}

export { loadShipPlacementMenu };
