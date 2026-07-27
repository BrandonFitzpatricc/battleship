import { ComputerPlayer } from "./player";

const GameHandler = (function () {
  let players;
  let attackingPlayer;
  let targetedPlayer;
  let switchingPlayers;
  let gameOver;

  const getPlayers = () => players;
  const getAttackingPlayer = () => attackingPlayer;
  const getTargetedPlayer = () => targetedPlayer;
  const isSwitchingPlayers = () => switchingPlayers;
  const endSwitchingPlayers = () => (switchingPlayers = false);
  const isGameOver = () => gameOver;
  const isTwoPlayerGame = () => !(players[1] instanceof ComputerPlayer);

  const startNewGame = (playerArray) => {
    players = playerArray;
    attackingPlayer = players[0];
    targetedPlayer = players[1];
    switchingPlayers = false;
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
    if (isTwoPlayerGame()) switchingPlayers = true;
    const temp = attackingPlayer;
    attackingPlayer = targetedPlayer;
    targetedPlayer = temp;
  }

  return {
    getPlayers,
    getAttackingPlayer,
    getTargetedPlayer,
    isSwitchingPlayers,
    endSwitchingPlayers,
    isGameOver,
    isTwoPlayerGame,
    startNewGame,
    playRound,
  };
})();

export { GameHandler };
