import { ComputerPlayer } from "./player";

const GameHandler = (function () {
  let players;
  let attackingPlayer;
  let targetedPlayer;
  let gameOver;

  const getPlayers = () => players;
  const getAttackingPlayer = () => attackingPlayer;
  const getTargetedPlayer = () => targetedPlayer;
  const isGameOver = () => gameOver;

  const startNewGame = (playerArray) => {
    players = playerArray;
    attackingPlayer = players[0];
    targetedPlayer = players[1];
    gameOver = false;
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
          return;
        }
      }
    }
  };

  function switchPlayers() {
    const temp = attackingPlayer;
    attackingPlayer = targetedPlayer;
    targetedPlayer = temp;
  }

  return {
    getPlayers,
    getAttackingPlayer,
    getTargetedPlayer,
    isGameOver,
    startNewGame,
    playRound,
  };
})();

export { GameHandler };
