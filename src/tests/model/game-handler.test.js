import { GameBoard } from "../../scripts/model/game-board";
import { Player } from "../../scripts/model/player";
import { ComputerPlayer } from "../../scripts/model/player";
import { Position } from "../../scripts/model/utilities/position";

import {
  getAttackingPlayer,
  isGameOver,
  setup,
  startNewGame,
  playRound,
} from "../../scripts/model/game-handler";

describe("Test one player games", () => {
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

    setup([realPlayer, computerPlayer]);
    startNewGame([realPlayer, computerPlayer]);
  });

  test("A full one player game where the real player wins can be completed from start to finish", () => {
    playRound(2, 1);
    playRound(3, 1);
    playRound(4, 1);
    playRound(5, 1);

    playRound(2, 7);
    playRound(3, 7);
    playRound(4, 7);
    playRound(5, 7);
    playRound(6, 7);

    playRound(8, 3);
    playRound(8, 4);
    playRound(8, 5);

    playRound(0, 3);
    playRound(0, 4);
    playRound(0, 5);

    playRound(9, 7);
    playRound(9, 8);

    expect(isGameOver()).toBe(true);
    // prettier-ignore
    expect(getAttackingPlayer() instanceof ComputerPlayer).toBe(false);
  });

  test("A full one player game where the computer player wins can be completed from start to finish", () => {
    while (!isGameOver()) {
      playRound(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
    }
    // prettier-ignore
    expect(getAttackingPlayer() instanceof ComputerPlayer).toBe(true);
  });
});

describe("Test two player games", () => {
  beforeEach(() => {
    const player1 = new Player();
    const player2 = new Player();

    [player1, player2].forEach((player) => {
      const gameBoard = new GameBoard();
      gameBoard.placeShipVertically("battleship", new Position(2, 1));
      gameBoard.placeShipVertically("carrier", new Position(2, 7));
      gameBoard.placeShipHorizontally("destroyer", new Position(8, 3));
      gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
      gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));
      player.gameBoard = gameBoard;
    });

    setup([player1, player2]);
    startNewGame([player1, player2]);
  });

  test("A full two player game can be completed from start to finish", () => {
    playRound(2, 1);
    playRound(2, 2);

    playRound(8, 3);
    playRound(8, 4);
    playRound(8, 5);
    playRound(5, 3);

    playRound(3, 1);
    playRound(4, 1);
    playRound(5, 1);

    playRound(2, 7);
    playRound(3, 7);
    playRound(4, 7);
    playRound(5, 7);
    playRound(6, 7);

    playRound(8, 3);
    playRound(8, 4);
    playRound(8, 5);

    playRound(0, 3);
    playRound(0, 4);
    playRound(0, 5);

    playRound(9, 7);
    playRound(9, 8);

    expect(isGameOver()).toBe(true);
  });
});
