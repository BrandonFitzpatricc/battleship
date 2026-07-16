import { Ship } from "./ship.js";
import { Position } from "./position.js";

class GameBoard {
  #board;
  #ships;

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

    this.#ships = [];
  }

  get board() {
    return this.#board;
  }

  get ships() {
    return this.#ships;
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
    const ship = new Ship(name);
    if (this.#invalidPlacement(ship, headPosition, orientation, isRandom))
      return false;
    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        this.#board[headPosition.row][headPosition.column + i].push(ship);
        //prettier-ignore
      } else if (orientation === "vertical") {
        this.#board[headPosition.row + i][headPosition.column].push(ship);
      }
    }
    this.#ships.push(ship);
    return true;
  }

  // Note: Additional constraints are added to randomly placed ships to prevent two or
  // more ships from being placed directly next to each other
  #invalidPlacement(ship, headPosition, orientation, isRandom) {
    let invalidPlacement;

    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        invalidPlacement =
          headPosition.column + ship.length - 1 > 9 ||
          this.#board[headPosition.row][headPosition.column + i].length > 1;

        if (invalidPlacement) return true;

        if (isRandom) {
          //prettier-ignore
          const leftOfHead = this.#board[headPosition.row][headPosition.column - 1];
          if (leftOfHead) {
            if (leftOfHead.length > 1) return true;
          }
          //prettier-ignore
          const rightOfTail = this.#board[headPosition.row][headPosition.column + ship.length]
          if (rightOfTail) {
            if (rightOfTail.length > 1) return true;
          }

          for (let j = -1; j <= 1; j = j + 2) {
            if (this.#board[headPosition.row + j]) {
              invalidPlacement =
                this.#board[headPosition.row + j][headPosition.column + i]
                  .length > 1;
              if (invalidPlacement) return true;
            }
          }
        }
      } else if (orientation === "vertical") {
        invalidPlacement =
          headPosition.row + ship.length - 1 > 9 ||
          this.#board[headPosition.row + i][headPosition.column].length > 1;

        if (invalidPlacement) return true;

        if (isRandom) {
          if (this.#board[headPosition.row - 1]) {
            // prettier-ignore
            const aboveHead = this.#board[headPosition.row - 1][headPosition.column];
            if (aboveHead) {
              if (aboveHead.length > 1) return true;
            }
          }

          if (this.#board[headPosition.row + ship.length]) {
            // prettier-ignore
            const belowTail = this.#board[headPosition.row + ship.length][headPosition.column]
            if (belowTail) {
              if (belowTail.length > 1) return true;
            }
          }

          for (let j = -1; j <= 1; j = j + 2) {
            const adjacentPosition =
              this.#board[headPosition.row + i][headPosition.column + j];
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
    return this.#ships.filter((ship) => ship.isSunk()).length === 5;
  }
}

export { GameBoard };
