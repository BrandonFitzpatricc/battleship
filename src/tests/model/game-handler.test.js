import { GameBoard } from "../../scripts/model/game-board";
import { Player } from "../../scripts/model/player";
import { ComputerPlayer } from "../../scripts/model/player";
import { GameHandler } from "../../scripts/model/game-handler";
import { Position } from "../../scripts/model/position";

describe("Test game flow", () => {
  beforeEach(() => {
    const realPlayer = new Player();
    const computerPlayer = new ComputerPlayer();

    [realPlayer, computerPlayer].forEach((player) => {
      const gameBoard = new GameBoard();
      gameBoard.placeShipVertically("battleship", new Position(2, 1));
      gameBoard.placeShipVertically("carrier", new Position(2, 7));
      gameBoard.placeShipHorizontally("destroyer", new Position(8, 3));
      gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
      gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));
      player.gameBoard = gameBoard;
    });

    GameHandler.startNewGame([realPlayer, computerPlayer]);
  });

  test("A full one player game where the real player wins can be completed from start to finish", () => {
    GameHandler.playRound(2, 1);
    GameHandler.playRound(3, 1);
    GameHandler.playRound(4, 1);
    GameHandler.playRound(5, 1);

    GameHandler.playRound(2, 7);
    GameHandler.playRound(3, 7);
    GameHandler.playRound(4, 7);
    GameHandler.playRound(5, 7);
    GameHandler.playRound(6, 7);

    GameHandler.playRound(8, 3);
    GameHandler.playRound(8, 4);
    GameHandler.playRound(8, 5);

    GameHandler.playRound(0, 3);
    GameHandler.playRound(0, 4);
    GameHandler.playRound(0, 5);

    GameHandler.playRound(9, 7);
    GameHandler.playRound(9, 8);

    expect(GameHandler.isGameOver()).toBe(true);
    // prettier-ignore
    expect(GameHandler.getAttackingPlayer() instanceof ComputerPlayer).toBe(false);
  });

  test("A full one player game where the computer player wins can be completed from start to finish", () => {
    while (!GameHandler.isGameOver()) {
      GameHandler.playRound(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      );
    }
    // prettier-ignore
    expect(GameHandler.getAttackingPlayer() instanceof ComputerPlayer).toBe(true);
  });
});
