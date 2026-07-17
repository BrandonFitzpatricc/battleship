import { GameBoard } from "../../scripts/model/game-board.js";
import { Position } from "../../scripts/model/position.js";

let gameBoard;
beforeEach(() => {
  gameBoard = new GameBoard();
});

describe("Test game board object instantiation", () => {
  test("A game board object is successfully created", () => {
    expect(gameBoard.board).toEqual([
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
    expect(gameBoard.ships).toEqual([]);
  });
});

describe("Test placeShip method", () => {
  test("A ship that's placed on the game board is successfully saved", () => {
    gameBoard.placeShipHorizontally("battleship", new Position(0, 0));
    expect(gameBoard.ships[0].name).toBe("battleship");
  });

  test("Placing a ship successfully will return true", () => {
    //prettier-ignore
    expect(gameBoard.placeShipHorizontally("carrier", new Position(0, 5))).toBe(true);
    // prettier-ignore
    expect(gameBoard.placeShipVertically("battleship", new Position(6, 0))).toBe(true);
  });

  test("An attempt to place a ship in the same position as another ship will return false", () => {
    // prettier-ignore
    expect(gameBoard.placeShipHorizontally("battleship", new Position(1, 4))).toBe(true);
    // prettier-ignore
    expect(gameBoard.placeShipVertically("carrier", new Position(0, 5))).toBe(false);
  });

  test("An attempt to place a ship out of bounds will return false", () => {
    // prettier-ignore
    expect(gameBoard.placeShipHorizontally("carrier", new Position(0, 6))).toBe(false);
    // prettier-ignore
    expect(gameBoard.placeShipVertically("battleship", new Position(7, 0))).toBe(false);
  });
});

describe("Test placeShip + receiveAttack methods", () => {
  test("A battleship placed horizontally at [0, 0] is sunk after [0, 0], [0, 1], [0, 2], and [0, 3] are targeted", () => {
    gameBoard.placeShipHorizontally("battleship", new Position(0, 0));
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(0, 2);
    gameBoard.receiveAttack(0, 3);
    expect(gameBoard.ships[0].isSunk()).toBe(true);
  });

  test("A battleship placed vertically at [0, 0] is sunk after [0, 0], [1, 0], [2, 0] and [3, 0] are targeted", () => {
    gameBoard.placeShipVertically("battleship", new Position(0, 0));
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(2, 0);
    gameBoard.receiveAttack(3, 0);
    expect(gameBoard.ships[0].isSunk()).toBe(true);
  });

  test("A battleship placed horizontally at [0, 0] is not sunk after [0, 0], [1, 0], [2, 0] and [3, 0] are targeted", () => {
    gameBoard.placeShipHorizontally("battleship", new Position(0, 0));
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(2, 0);
    gameBoard.receiveAttack(3, 0);
    expect(gameBoard.ships[0].isSunk()).toBe(false);
  });

  test("An attack at positions with no ship will change their values to 1", () => {
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(4, 5);
    gameBoard.receiveAttack(7, 2);
    expect(gameBoard.board).toEqual([
      [[1], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [1], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [1], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
    ]);
  });

  test("An attack at a position that has already been attacked will return false", () => {
    expect(gameBoard.receiveAttack(0, 0)).toBe(true);
    expect(gameBoard.receiveAttack(0, 0)).toBe(false);
  });

  test("Ship placement and attacking works as expected with multiple ships on the board", () => {
    gameBoard.placeShipVertically("battleship", new Position(2, 1));
    gameBoard.placeShipVertically("carrier", new Position(2, 7));
    gameBoard.placeShipHorizontally("destroyer", new Position(8, 3));
    gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
    gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));

    gameBoard.receiveAttack(2, 1);
    gameBoard.receiveAttack(3, 1);
    gameBoard.receiveAttack(4, 1);
    gameBoard.receiveAttack(5, 1);

    gameBoard.receiveAttack(8, 3);
    gameBoard.receiveAttack(8, 4);
    gameBoard.receiveAttack(8, 5);

    gameBoard.receiveAttack(3, 7);
    gameBoard.receiveAttack(9, 7);
    gameBoard.receiveAttack(0, 6);

    gameBoard.receiveAttack(5, 2);
    gameBoard.receiveAttack(2, 0);

    expect(
      gameBoard.ships.filter((ship) => ship.isSunk()).map((ship) => ship.name),
    ).toEqual(["battleship", "destroyer"]);
  });
});

describe("Test clearBoard method", () => {
  test("clearBoard method successfully resets a populated game board and ships array", () => {
    gameBoard.placeShipVertically("battleship", new Position(2, 1));
    gameBoard.placeShipVertically("carrier", new Position(2, 7));
    gameBoard.placeShipHorizontally("destroyer", new Position(8, 3));
    gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
    gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));

    gameBoard.clearBoard();
    expect(gameBoard.board).toEqual([
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
    expect(gameBoard.ships).toEqual([]);
  });
});

describe("Test placeShipsRandomly method", () => {
  test("placeShipsRandomly method successfully places all five ships on the board", () => {
    gameBoard.placeShipsRandomly();

    let shipSquares = 0;
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[i].length; j++) {
        if (gameBoard.board[i][j].length > 1) shipSquares++;
      }
    }

    expect(shipSquares).toBe(17);
    expect(gameBoard.ships.length).toBe(5);
  });
});

describe("Test removeShip method", () => {
  test("All ships on a populated game board can be removed successfully", () => {
    gameBoard.removeShip("battleship");
    gameBoard.removeShip("carrier");
    gameBoard.removeShip("destroyer");
    gameBoard.removeShip("submarine");
    gameBoard.removeShip("patrol-boat");

    expect(gameBoard.board).toEqual([
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
    expect(gameBoard.ships).toEqual([]);
  });

  test("Trying to remove a ship that isn't on the game board doesn't break the method", () => {
    gameBoard.removeShip("carrier");

    expect(gameBoard.board).toEqual([
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
    expect(gameBoard.ships).toEqual([]);
  });
});

describe("Test isSunk method", () => {
  beforeEach(() => {
    gameBoard.placeShipVertically("battleship", new Position(2, 1));
    gameBoard.placeShipVertically("carrier", new Position(2, 7));
    gameBoard.placeShipHorizontally("destroyer", new Position(8, 3));
    gameBoard.placeShipHorizontally("submarine", new Position(0, 3));
    gameBoard.placeShipHorizontally("patrol-boat", new Position(9, 7));
  });

  test("isSunk returns false when there are still active ships", () => {
    gameBoard.receiveAttack(2, 1);
    gameBoard.receiveAttack(3, 1);
    gameBoard.receiveAttack(4, 1);
    gameBoard.receiveAttack(5, 1);

    gameBoard.receiveAttack(8, 3);
    gameBoard.receiveAttack(8, 4);
    gameBoard.receiveAttack(8, 5);

    gameBoard.receiveAttack(3, 7);
    gameBoard.receiveAttack(9, 7);
    gameBoard.receiveAttack(0, 6);

    gameBoard.receiveAttack(5, 2);
    gameBoard.receiveAttack(2, 0);

    expect(gameBoard.allShipsSunk()).toBe(false);
  });

  test("isSunk returns true when every ship has been sunk", () => {
    gameBoard.receiveAttack(2, 1);
    gameBoard.receiveAttack(3, 1);
    gameBoard.receiveAttack(4, 1);
    gameBoard.receiveAttack(5, 1);

    gameBoard.receiveAttack(2, 7);
    gameBoard.receiveAttack(3, 7);
    gameBoard.receiveAttack(4, 7);
    gameBoard.receiveAttack(5, 7);
    gameBoard.receiveAttack(6, 7);

    gameBoard.receiveAttack(8, 3);
    gameBoard.receiveAttack(8, 4);
    gameBoard.receiveAttack(8, 5);

    gameBoard.receiveAttack(0, 3);
    gameBoard.receiveAttack(0, 4);
    gameBoard.receiveAttack(0, 5);

    gameBoard.receiveAttack(9, 7);
    gameBoard.receiveAttack(9, 8);

    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});
