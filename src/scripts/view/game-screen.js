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

  playerIcon.className += " selected";

  const activeMessage = createTextElement(
    "div",
    "",
    !GameHandler.isGameOver() ? "Is Firing..." : "Wins!",
  );

  header.append(playerIcon, activeMessage);

  return header;
}

function loadPlayerDisplay(player, number) {
  const playerDisplay = createElement("div", `player-display ${number}`);

  const playerStatus = loadPlayerStatus(player);

  const isComputerPlayer = player instanceof ComputerPlayer;

  const gameBoard =
    isComputerPlayer && !GameHandler.isGameOver()
      ? createHiddenAttackingGameBoard(player.gameBoard)
      : createAttackingGameBoard(player.gameBoard);

  gameBoard.className +=
    player === GameHandler.getTargetedPlayer() || GameHandler.isGameOver()
      ? " active"
      : " inactive";

  playerDisplay.append(playerStatus, gameBoard);

  return playerDisplay;
}

function loadPlayerStatus(player) {
  const playerStatus = createElement("div", "player-status");

  const isAttacking = GameHandler.getAttackingPlayer() === player;

  const playerIcon =
    isAttacking && GameHandler.isGameOver()
      ? createWinningPlayerIcon(player.icon, 70)
      : createPlayerIcon(player.icon, 70);

  if (isAttacking) playerIcon.className += " selected";

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
