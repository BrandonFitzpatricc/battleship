import {
  createElement,
  createTextElement,
  createPlayerIcon,
  createGameBoardDisplay,
} from "./element-factory.js";

import { Attribute } from "./attribute.js";

import { GameHandler } from "../model/game-handler.js";

const loadGameScreen = () => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "game-screen");

  const header = loadHeader(GameHandler.getAttackingPlayer());
  // prettier-ignore
  const playerOneDisplay = loadPlayerDisplay(GameHandler.getPlayers()[0], "one");
  // prettier-ignore
  const playerTwoDisplay = loadPlayerDisplay(GameHandler.getPlayers()[1], "two");

  mainContainer.append(header, playerOneDisplay, playerTwoDisplay);

  document.body.appendChild(mainContainer);
};

function loadHeader(attackingPlayer) {
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

  const playerIcon = createPlayerIcon(attackingPlayer.icon, 60);

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

function loadPlayerDisplay(player, number) {
  const playerDisplay = createElement(
    "div",
    `player-display ${number}`,
    new Attribute("id", `player-${number}`),
  );

  const playerStatus = loadPlayerStatus(player);

  const gameBoard = createGameBoardDisplay(player.gameBoard);

  playerDisplay.append(playerStatus, gameBoard);

  return playerDisplay;
}

function loadPlayerStatus(player) {
  const playerStatus = createElement("div", "player-status");

  const playerIcon = createPlayerIcon(player.icon, 70);

  const shipsRemaining = createElement("div", "ships-remaining");

  player.gameBoard.placedShips.forEach((ship) => {
    // prettier-ignore
    const shipElement = createElement("div", `ship ${ship.name}`, new Attribute("id", ship.name));
    if (ship.isSunk()) shipElement.className += " sunk";
    shipsRemaining.appendChild(shipElement);
  });

  playerStatus.append(playerIcon, shipsRemaining);

  return playerStatus;
}

export { loadGameScreen };
