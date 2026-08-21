import { ComputerPlayer } from "./player";

let players;
let attackingPlayer;
let targetedPlayer;
let activeGame;
let switchingPlayers;
let gameOver;

const getPlayers = () => players;
const getAttackingPlayer = () => attackingPlayer;
const getTargetedPlayer = () => targetedPlayer;
const isActiveGame = () => activeGame;
const isSwitchingPlayers = () => switchingPlayers;
const endSwitchingPlayers = () => (switchingPlayers = false);
const isGameOver = () => gameOver;
const isTwoPlayerGame = () => !(players[1] instanceof ComputerPlayer);

const setup = (playerArray) => {
  gameOver = false;
  players = playerArray;
  attackingPlayer = players[0];
  targetedPlayer = players[1];
};

const startNewGame = () => {
  activeGame = true;
  attackingPlayer = players[0];
  targetedPlayer = players[1];
  switchingPlayers = false;
};

const playRound = (row, column) => {
  if (!gameOver) {
    const targetBoard = targetedPlayer.gameBoard;

    if (!(attackingPlayer instanceof ComputerPlayer)) {
      if (!targetBoard.receiveAttack(row, column)) return;
    } else {
      const attackPosition = attackingPlayer.attack(targetBoard);
      ({ row, column } = attackPosition);
    }

    const successfulAttack = targetBoard.board[row][column].length > 1;
    if (!successfulAttack) {
      switchPlayers();
    } else {
      if (targetBoard.allShipsSunk()) {
        gameOver = true;
        activeGame = false;
        return;
      }
    }
  }
};

function switchPlayers() {
  if (isTwoPlayerGame()) switchingPlayers = true;
  const temp = attackingPlayer;
  attackingPlayer = targetedPlayer;
  targetedPlayer = temp;
}

export {
  getPlayers,
  getAttackingPlayer,
  getTargetedPlayer,
  isActiveGame,
  isSwitchingPlayers,
  endSwitchingPlayers,
  isGameOver,
  isTwoPlayerGame,
  setup,
  startNewGame,
  playRound,
};
