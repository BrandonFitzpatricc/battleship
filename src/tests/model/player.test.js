import { RealPlayer, ComputerPlayer } from "../../scripts/model/player.js";
import { GameBoard } from "../../scripts/model/game-board.js";
import { Position } from "../../scripts/model/position.js";

let realPlayer;
let computerPlayer;
beforeEach(() => {
  realPlayer = new RealPlayer(new GameBoard(), true);
  computerPlayer = new ComputerPlayer(new GameBoard(), false);
});

describe("test player object instantiation", () => {
  test("Real player objects are successfully created", () => {
    expect(realPlayer.gameBoard.board).toEqual([
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
    ]);
    expect(realPlayer.isActive).toBe(true);
  });

  test("Computer player objects are successfully created", () => {
    expect(computerPlayer.gameBoard.board).toEqual([
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
    ]);
    expect(computerPlayer.isActive).toBe(false);
  });
});

describe("test attack methods of the computer player object", () => {
  describe("test regular attacks", () => {
    beforeEach(() => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("battleship", new Position(2, 1));
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("carrier", new Position(2, 7));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("destroyer", new Position(8, 3));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));
    });

    test("The computer's first attack against a new game board is in the center", () => {
      computerPlayer.attack(realPlayer.gameBoard);

      const realPlayerBoard = realPlayer.gameBoard.board;

      const centerAttack = realPlayerBoard[4][4][0] === 1;
      realPlayerBoard[4][5][0] === 1 ||
        realPlayerBoard[5][4][0] === 1 ||
        realPlayerBoard[5][5][0] === 1;

      expect(centerAttack).toBe(true);
    });

    test("If [4, 4] has been targeted with a missed attack, then the computer's next attack will be at [5, 5]", () => {
      realPlayer.gameBoard.receiveAttack(4, 4);
      computerPlayer.attack(realPlayer.gameBoard);
      expect(realPlayer.gameBoard.board[5][5][0]).toBe(1);
    });

    test("If [6, 6], [7, 2], [2, 4], and [5, 3] have been targeted with missed attacks, then the computer's next attack will be at [4, 5]", () => {
      realPlayer.gameBoard.receiveAttack(6, 6);
      realPlayer.gameBoard.receiveAttack(7, 2);
      realPlayer.gameBoard.receiveAttack(2, 4);
      realPlayer.gameBoard.receiveAttack(5, 3);

      computerPlayer.attack(realPlayer.gameBoard);

      expect(realPlayer.gameBoard.board[4][5][0]).toBe(1);
    });

    test("If [2, 2], [7, 7], [5, 3], [4, 5], [7, 4], and [3, 6] have been targeted with missed attacks, then the computer's next attack will be at [6, 2]", () => {
      realPlayer.gameBoard.receiveAttack(2, 2);
      realPlayer.gameBoard.receiveAttack(7, 7);
      realPlayer.gameBoard.receiveAttack(5, 3);
      realPlayer.gameBoard.receiveAttack(4, 5);
      realPlayer.gameBoard.receiveAttack(7, 4);
      realPlayer.gameBoard.receiveAttack(3, 6);

      computerPlayer.attack(realPlayer.gameBoard);

      expect(realPlayer.gameBoard.board[6][2][0]).toBe(1);
    });

    test("The computer does not target the position of a sunk ship", () => {
      realPlayer.gameBoard.clearBoard();
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("battleship", new Position(4, 4));
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("carrier", new Position(2, 7));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("destroyer", new Position(2, 2));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));

      realPlayer.gameBoard.receiveAttack(4, 4);
      realPlayer.gameBoard.receiveAttack(4, 5);
      realPlayer.gameBoard.receiveAttack(4, 6);
      realPlayer.gameBoard.receiveAttack(4, 7);

      realPlayer.gameBoard.receiveAttack(2, 2);
      realPlayer.gameBoard.receiveAttack(2, 3);
      realPlayer.gameBoard.receiveAttack(2, 4);

      computerPlayer.attack(realPlayer.gameBoard);

      expect(realPlayer.gameBoard.board[5][2][0]).toBe(1);
    });
  });

  describe("test attacks against damaged ships", () => {
    beforeEach(() => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("carrier", new Position(2, 9));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("destroyer", new Position(9, 3));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));

      realPlayer.gameBoard.receiveAttack(1, 1);
      realPlayer.gameBoard.receiveAttack(2, 5);
      realPlayer.gameBoard.receiveAttack(8, 6);
      realPlayer.gameBoard.receiveAttack(0, 6);
      realPlayer.gameBoard.receiveAttack(3, 0);
      realPlayer.gameBoard.receiveAttack(6, 8);
      realPlayer.gameBoard.receiveAttack(4, 3);
    });

    test("Once a ship has been found, the following move will target one of its adjacent positions", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("battleship", new Position(5, 4));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));

      computerPlayer.attack(realPlayer.gameBoard);

      const realPlayerBoard = realPlayer.gameBoard.board;

      const adjacentAttack =
        realPlayerBoard[4][4][0] === 1 ||
        realPlayerBoard[5][3][0] === 1 ||
        realPlayerBoard[5][5][0] === 1 ||
        realPlayerBoard[6][4][0] === 1;

      expect(adjacentAttack).toBe(true);
    });

    test("Once a horizontally placed ship's head has been found, it will be destroyed in no more than four turns", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("battleship", new Position(5, 4));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));

      let turns = 0;
      while (true) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
        //prettier-ignore
        if(realPlayer.gameBoard.ships.find(ship => ship.name === "battleship").isSunk()) break;
      }
      expect(turns).toBeLessThanOrEqual(4);
    });

    test("Once a vertically placed ship's head has been found, it will be destroyed in no more than four turns", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("battleship", new Position(5, 4));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));

      let turns = 0;
      while (true) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
        //prettier-ignore
        if(realPlayer.gameBoard.ships.find(ship => ship.name === "battleship").isSunk()) break;
      }
      expect(turns).toBeLessThanOrEqual(4);
    });

    test("Once a horizontally placed ship's body has been found, it will be destroyed in no more than four turns", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("battleship", new Position(5, 3));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));

      let turns = 0;
      while (true) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
        //prettier-ignore
        if(realPlayer.gameBoard.ships.find(ship => ship.name === "battleship").isSunk()) break;
      }
      expect(turns).toBeLessThanOrEqual(4);
    });

    test("Once a vertically placed ship's body has been found, it will be destroyed in no more than four turns", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("battleship", new Position(4, 4));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));

      let turns = 0;
      while (true) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
        //prettier-ignore
        if(realPlayer.gameBoard.ships.find(ship => ship.name === "battleship").isSunk()) break;
      }
      expect(turns).toBeLessThanOrEqual(4);
    });

    test("If a new ship is hit while targeting another ship, then both ships will be destroyed in no more than eight turns", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("battleship", new Position(4, 4));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(3, 4));

      let turns = 0;
      while (turns < 3) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
        if (
          realPlayer.gameBoard.ships
            .find((ship) => ship.name === "battleship")
            .isSunk() &&
          realPlayer.gameBoard.ships
            .find((ship) => ship.name === "submarine")
            .isSunk()
        )
          break;
      }
      expect(turns).toBeLessThanOrEqual(8);
    });
  });

  describe("test computer attack stability", () => {
    test("The computer is able to destroy every ship in a game board of spread out ships", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("carrier", new Position(2, 9));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("destroyer", new Position(9, 3));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("battleship", new Position(5, 4));
      //prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(0, 3));

      let turns = 0;
      while (!realPlayer.gameBoard.allShipsSunk()) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
      }
    });

    test("The computer is able to destroy every ship in a game board where every ship is placed directly next to each other in the top left corner", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("carrier", new Position(0, 0));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("battleship", new Position(0, 1));
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("destroyer", new Position(1, 1));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(1, 2));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("patrol-boat", new Position(2, 2));

      let turns = 0;
      while (!realPlayer.gameBoard.allShipsSunk()) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
      }
    });

    test("The computer is able to destroy every ship in a game board where every ship is placed in all four corners", () => {
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("carrier", new Position(0, 0));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("battleship", new Position(0, 6));
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("destroyer", new Position(7, 9));
      // prettier-ignore
      realPlayer.gameBoard.placeShipHorizontally("submarine", new Position(9, 0));
      // prettier-ignore
      realPlayer.gameBoard.placeShipVertically("patrol-boat", new Position(1, 9));

      let turns = 0;
      while (!realPlayer.gameBoard.allShipsSunk()) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
      }
    });

    test("The computer is able to destroy every ship in a game board with randomized ship placements", () => {
      realPlayer.gameBoard.placeShipsRandomly();

      let turns = 0;
      while (!realPlayer.gameBoard.allShipsSunk()) {
        turns++;
        computerPlayer.attack(realPlayer.gameBoard);
      }
    });
  });
});
