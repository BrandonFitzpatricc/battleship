import { Ship } from "./ship.js";
import { Position } from "./position.js";

class GameBoard {
  #board;
  #unplacedShips;
  #placedShips;
  #selectedShip;

  constructor() {
    this.clearBoard();
  }

  clearBoard() {
    // Every bucket in the board contains a number (0 if the position has not been attacked,
    // 1 if it has), and a ship object IF that position contains a ship.
    this.#board = [
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
    ];

    this.#unplacedShips = [
      new Ship("carrier", "vertical"),
      new Ship("battleship", "vertical"),
      new Ship("destroyer", "vertical"),
      new Ship("submarine", "vertical"),
      new Ship("patrol-boat", "vertical"),
    ];

    this.#placedShips = [];

    this.#selectedShip = null;
  }

  get board() {
    return this.#board;
  }

  get unplacedShips() {
    return this.#unplacedShips;
  }

  get placedShips() {
    return this.#placedShips;
  }

  get selectedShip() {
    return this.#selectedShip;
  }

  set selectedShip(value) {
    this.#selectedShip = value;
  }

  placeShipHorizontally(name, headPosition, isRandom) {
    return this.#placeShip(name, headPosition, "horizontal", isRandom);
  }

  placeShipVertically(name, headPosition, isRandom) {
    return this.#placeShip(name, headPosition, "vertical", isRandom);
  }

  // headPosition is the leftmost ship position if the orientation is horizontal, or the topmost
  // ship position if the orientation is vertical
  #placeShip(name, headPosition, orientation, isRandom) {
    const ship = this.#unplacedShips.find((ship) => ship.name === name);
    // prettier-ignore
    if (this.#invalidPlacement(ship, headPosition, orientation, isRandom)) return false;
    ship.orientation = orientation;
    // prettier-ignore
    for (let i = 0; i < ship.length; i++) {
      const row = orientation === "horizontal" ? headPosition.row : headPosition.row + i;
      const column = orientation === "vertical" ? headPosition.column : headPosition.column + i;
      this.#board[row][column].push(ship)
    }

    this.#unplacedShips.splice(this.#unplacedShips.indexOf(ship), 1);
    this.#placedShips.push(ship);

    return true;
  }

  // Note: Additional constraints are added to randomly placed ships to prevent two or
  // more ships from being placed directly next to each other
  #invalidPlacement(ship, headPosition, orientation, isRandom) {
    if (headPosition.row < 0 || headPosition.column < 0) return true;

    for (let i = 0; i < ship.length; i++) {
      // prettier-ignore
      const row = orientation === "horizontal" ? headPosition.row : headPosition.row + i;
      // prettier-ignore
      const column = orientation === "vertical" ? headPosition.column: headPosition.column + i;

      let invalidPlacement;

      if (orientation === "horizontal") {
        invalidPlacement =
          headPosition.column + ship.length - 1 > 9 ||
          this.#board[row][column].length > 1;

        if (invalidPlacement) return true;

        if (isRandom) {
          //prettier-ignore
          const leftOfHead = this.#board[row][headPosition.column - 1];
          if (leftOfHead) {
            if (leftOfHead.length > 1) return true;
          }
          //prettier-ignore
          const rightOfTail = this.#board[row][headPosition.column + ship.length]
          if (rightOfTail) {
            if (rightOfTail.length > 1) return true;
          }

          for (let j = -1; j <= 1; j = j + 2) {
            const adjacentRowPresent = Boolean(this.#board[row + j]);
            if (adjacentRowPresent) {
              invalidPlacement = this.#board[row + j][column].length > 1;
              if (invalidPlacement) return true;
            }
          }
        }
      } else if (orientation === "vertical") {
        invalidPlacement =
          headPosition.row + ship.length - 1 > 9 ||
          this.#board[row][column].length > 1;

        if (invalidPlacement) return true;

        if (isRandom) {
          const rowAbove = Boolean(this.#board[headPosition.row - 1]);
          if (rowAbove) {
            // prettier-ignore
            const aboveHead = this.#board[headPosition.row - 1][column];
            if (aboveHead.length > 1) return true;
          }

          const rowBelow = Boolean(this.#board[headPosition.row + ship.length]);
          if (rowBelow) {
            // prettier-ignore
            const belowTail = this.#board[headPosition.row + ship.length][column]
            if (belowTail.length > 1) return true;
          }

          for (let j = -1; j <= 1; j = j + 2) {
            const adjacentPosition = this.#board[row][column + j];
            if (adjacentPosition) {
              invalidPlacement = adjacentPosition.length > 1;
              if (invalidPlacement) return true;
            }
          }
        }
      }
    }
    return false;
  }

  placeShipsRandomly() {
    this.clearBoard();
    ["carrier", "battleship", "destroyer", "submarine", "patrol-boat"].forEach(
      (shipName) => {
        this.placeShipFn =
          Math.round(Math.random() * 1) === 0
            ? this.placeShipHorizontally
            : this.placeShipVertically;

        while (true) {
          const row = Math.floor(Math.random() * 10);
          const column = Math.floor(Math.random() * 10);
          // prettier-ignore
          if (this.placeShipFn(shipName, new Position(row, column), true)) break;
        }
      },
    );
  }

  removeShip(shipName) {
    const board = this.#board;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].length > 1) {
          if (board[i][j][1].name === shipName) {
            board[i][j] = [0];
          }
        }
      }
    }

    const placedShips = this.#placedShips;
    // prettier-ignore
    const ship = placedShips.splice(placedShips.findIndex(placedShip => placedShip.name === shipName), 1);
    if (ship[0]) this.#unplacedShips.push(ship[0]);
  }

  rotateShip(ship) {
    const currentHead = this.getHeadPosition(ship.name);

    if (currentHead) {
      this.removeShip(ship.name);

      const newHeadOffset = ship.name === "carrier" ? 2 : 1;

      const newHeadRow =
        ship.orientation === "vertical"
          ? currentHead.row + newHeadOffset
          : currentHead.row - newHeadOffset;

      const newHeadColumn =
        ship.orientation === "horizontal"
          ? currentHead.column + newHeadOffset
          : currentHead.column - newHeadOffset;

      this.placeShipFn =
        ship.orientation === "vertical"
          ? this.placeShipHorizontally
          : this.placeShipVertically;

      // prettier-ignore
      if (!this.placeShipFn(ship.name, new Position(newHeadRow, newHeadColumn))) {
        this.placeShipFn =
          ship.orientation === "vertical"
            ? this.placeShipVertically
            : this.placeShipHorizontally;

        this.placeShipFn(ship.name, currentHead);
      }
    }
  }

  getHeadPosition(shipName) {
    const board = this.#board;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].length > 1) {
          if (board[i][j][1].name === shipName) {
            return new Position(i, j);
          }
        }
      }
    }
  }

  receiveAttack(row, column) {
    const target = this.#board[row][column];
    if (target[0] === 1) return false;

    if (target[0] === 0) {
      target[0] = 1;

      if (target.length > 1) target[1].hit();
    }

    return true;
  }

  allShipsSunk() {
    return this.#placedShips.filter((ship) => ship.isSunk()).length === 5;
  }
}

export { GameBoard };
