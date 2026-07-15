import {
  createElement,
  createTextElement,
  createPlayerIcon,
  createGameBoard,
} from "./element-factory.js";

import { Attribute } from "./attribute.js";

import { playerIcons } from "./icon-manager.js";

const loadGameScreen = () => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "game-screen");

  const header = loadHeader();
  const playerOneDisplay = loadPlayerDisplay("one");
  const playerTwoDisplay = loadPlayerDisplay("two");

  mainContainer.append(header, playerOneDisplay, playerTwoDisplay);

  document.body.appendChild(mainContainer);
};

function loadHeader() {
  const header = createElement("div", "header");

  const backToMenuBtn = createTextElement(
    "button",
    "text-btn back-to-menu hidden",
    "Back to Menu",
  );

  const playAgainBtn = createTextElement(
    "button",
    "text-btn play-again hidden",
    "Play Again",
  );

  const playerIcon = createPlayerIcon(
    playerIcons["boxing-glove"].src,
    playerIcons["boxing-glove"].alt,
    60,
  );

  playerIcon.className += " selected";

  const activeMessage = createTextElement(
    "div",
    "",
    "Is Firing...",
    new Attribute("id", "active-message"),
  );

  header.append(backToMenuBtn, playAgainBtn, playerIcon, activeMessage);

  return header;
}

function loadPlayerDisplay(playerNumber) {
  const playerDisplay = createElement(
    "div",
    `player-display ${playerNumber}`,
    new Attribute("id", `player-${playerNumber}`),
  );

  const playerStatus = loadPlayerStatus();

  const gameBoard = createGameBoard();

  playerDisplay.append(playerStatus, gameBoard);

  return playerDisplay;
}

function loadPlayerStatus() {
  const playerStatus = createElement("div", "player-status");

  const playerIcon = createPlayerIcon(
    playerIcons["boxing-glove"].src,
    playerIcons["boxing-glove"].alt,
    70,
  );

  const shipsRemaining = createElement("div", "ships-remaining");

  ["carrier", "battleship", "destroyer", "submarine", "patrol-boat"].forEach(
    (shipName) => {
      // prettier-ignore
      const ship = createElement("div", `ship ${shipName}`, new Attribute("id", shipName));
      shipsRemaining.appendChild(ship);
    },
  );

  playerStatus.append(playerIcon, shipsRemaining);

  return playerStatus;
}

export { loadGameScreen };
