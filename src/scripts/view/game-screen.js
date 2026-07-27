import {
  createElement,
  createTextElement,
  createPlayerIcon,
  createWinningPlayerIcon,
  createAttackingGameBoard,
  createHiddenAttackingGameBoard,
} from "./element-factory.js";

import { Attribute } from "./attribute.js";

import { GameHandler } from "../model/game-handler.js";
import { ComputerPlayer } from "../model/player.js";

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

  const playerIcon = createPlayerIcon(attackingPlayer.icon, 60);

  playerIcon.className += GameHandler.isSwitchingPlayers()
    ? " hidden"
    : " selected";

  const activeMessage = GameHandler.isSwitchingPlayers()
    ? "Switching Players..."
    : !GameHandler.isGameOver()
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

  const isTargetedPlayer = player === GameHandler.getTargetedPlayer();

  const gameBoard =
    (isComputerPlayer && !GameHandler.isGameOver()) ||
    (isTargetedPlayer && GameHandler.isTwoPlayerGame()) ||
    GameHandler.isSwitchingPlayers()
      ? createHiddenAttackingGameBoard(player.gameBoard)
      : createAttackingGameBoard(player.gameBoard);

  gameBoard.className +=
    player === GameHandler.getTargetedPlayer() ||
    GameHandler.isGameOver() ||
    GameHandler.isSwitchingPlayers()
      ? " active"
      : " inactive";

  playerDisplay.append(playerStatus, gameBoard);

  return playerDisplay;
}

function loadPlayerStatus(player) {
  const playerStatus = createElement("div", "player-status");

  const isAttackingPlayer = GameHandler.getAttackingPlayer() === player;

  const playerIcon =
    isAttackingPlayer && GameHandler.isGameOver()
      ? createWinningPlayerIcon(player.icon, 70)
      : createPlayerIcon(player.icon, 70);

  if (isAttackingPlayer && !GameHandler.isSwitchingPlayers()) {
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
