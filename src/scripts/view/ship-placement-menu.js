import {
  createElement,
  createTextElement,
  createIconBtn,
  createPlayerIcon,
  createPlacementGameBoard,
} from "./element-factory.js";

import { Attribute } from "./attribute.js";

import { buttonIcons } from "./icon-manager.js";

const loadShipPlacementMenu = (player, gameBoard) => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "ship-placement-menu");

  const header = loadHeader(player);
  const shipContainer = loadShipContainer(gameBoard.placedShips);
  const gameBoardDisplay = createPlacementGameBoard(gameBoard);
  const optionBtns = loadOptionBtns(gameBoard);

  mainContainer.append(header, shipContainer, gameBoardDisplay, optionBtns);

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

function loadShipContainer(placedShips) {
  const shipContainer = createElement("div", "ship-container");

  ["carrier", "battleship", "destroyer", "submarine", "patrol-boat"].forEach(
    (shipName) => {
      const ship = createElement(
        "div",
        `ship ${shipName} vertical`,
        new Attribute("id", shipName),
        new Attribute("draggable", "true"),
      );
      // prettier-ignore
      if (placedShips.find(ship => ship.name === shipName)) ship.className += " hidden";
      shipContainer.appendChild(ship);
    },
  );

  return shipContainer;
}

function loadOptionBtns(gameBoard) {
  const optionBtns = createElement("ul", "option-btns");

  for (const iconName in buttonIcons) {
    const icon = buttonIcons[iconName];

    // prettier-ignore
    const iconBtn = createIconBtn("option-btn", iconName, icon, 120);

    const unusableButton =
      (iconName === "rotate" &&
        (gameBoard.placedShips.length === 0 || !gameBoard.selectedShip)) ||
      (iconName === "play" && gameBoard.placedShips.length < 5);

    if (unusableButton) {
      iconBtn.className += " hidden";
    }

    optionBtns.append(iconBtn);
  }

  return optionBtns;
}

export { loadShipPlacementMenu };
