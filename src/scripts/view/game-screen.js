import {
  createElement,
  createTextElement,
  createPlayerIcon,
  createWinningPlayerIcon,
  createAttackingGameBoard,
  createHiddenAttackingGameBoard,
} from "./utilities/element-factory.js";

import { Attribute } from "./utilities/attribute.js";

import { ComputerPlayer } from "../model/player.js";

import {
  getPlayers,
  getAttackingPlayer,
  getTargetedPlayer,
  isActiveGame,
  isSwitchingPlayers,
  isGameOver,
  isTwoPlayerGame,
} from "../model/game-handler.js";

const loadGameScreen = () => {
  const mainContent = document.querySelector(".main-content");

  mainContent.textContent = "";

  const gameScreen = createElement("div", "game-screen");

  const header = loadHeader(getAttackingPlayer());
  // prettier-ignore
  const playerOneDisplay = loadPlayerDisplay(getPlayers()[0], "one");
  // prettier-ignore
  const playerTwoDisplay = loadPlayerDisplay(getPlayers()[1], "two");

  gameScreen.append(header, playerOneDisplay, playerTwoDisplay);

  mainContent.appendChild(gameScreen);
};

function loadHeader(attackingPlayer) {
  const header = createElement("div", "header");

  const playerIcon = createPlayerIcon(attackingPlayer.icon, 60);

  playerIcon.className += isSwitchingPlayers() ? " hidden" : " selected";

  const activeMessage = isSwitchingPlayers()
    ? "Switching Players..."
    : !isGameOver()
      ? "Is Firing..."
      : "Wins!";

  const activeMessageElement = createTextElement("div", "", activeMessage);

  header.append(playerIcon, activeMessageElement);

  return header;
}

function loadPlayerDisplay(player, number) {
  const playerDisplay = createElement("div", `player-display ${number}`);

  const playerStatus = loadPlayerStatus(player);

  const isComputerPlayer = player instanceof ComputerPlayer;

  const isTargetedPlayer = player === getTargetedPlayer();

  let isHiddenBoard = false;
  if (!isGameOver()) {
    isHiddenBoard =
      isComputerPlayer ||
      (isTargetedPlayer && isTwoPlayerGame()) ||
      !isActiveGame() ||
      isSwitchingPlayers();
  }

  const gameBoard = isHiddenBoard
    ? createHiddenAttackingGameBoard(player.gameBoard)
    : createAttackingGameBoard(player.gameBoard);

  if (isActiveGame() && !isSwitchingPlayers()) {
    gameBoard.className +=
      player === getTargetedPlayer() ? " target" : " not-target";
  }

  const inactiveBoard = isSwitchingPlayers() || !isActiveGame();

  if (inactiveBoard) {
    gameBoard.className += " inactive";
  }

  playerDisplay.append(playerStatus, gameBoard);

  return playerDisplay;
}

function loadPlayerStatus(player) {
  const playerStatus = createElement("div", "player-status");

  const isAttackingPlayer = getAttackingPlayer() === player;

  const playerIcon =
    isAttackingPlayer && isGameOver()
      ? createWinningPlayerIcon(player.icon, 70)
      : createPlayerIcon(player.icon, 70);

  const playerIsSelected =
    isAttackingPlayer && !isSwitchingPlayers() && isActiveGame();

  if (playerIsSelected) {
    playerIcon.className += " selected";
  }

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
