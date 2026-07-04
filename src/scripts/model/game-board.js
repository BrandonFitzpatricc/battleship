import { Ship } from "./ship.js";
import { Position } from "./position.js";

class GameBoard {
  #board;
  #ships;

  constructor() {
    this.clearBoard();
  }

  clearBoard() {
    this.#board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.#ships = [];
  }

  get board() {
    return this.#board;
  }

  get ships() {
    return this.#ships;
  }

  placeShipHorizontally(name, headPosition) {
    return this.#placeShip(name, headPosition, "horizontal");
  }

  placeShipVertically(name, headPosition) {
    return this.#placeShip(name, headPosition, "vertical");
  }

  // headPosition is the leftmost ship position if the orientation is horizontal, or the topmost
  // ship position if the orientation is vertical
  #placeShip(name, headPosition, orientation) {
    const ship = new Ship(name);
    if (this.#invalidPlacement(ship, headPosition, orientation)) return false;
    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        this.#board[headPosition.row][headPosition.column + i] = ship;
        //prettier-ignore
      } else if (orientation === "vertical") {
        this.#board[headPosition.row + i][headPosition.column] = ship;
      }
    }
    this.#ships.push(ship);
    return true;
  }

  #invalidPlacement(ship, headPosition, orientation) {
    let invalidPlacement;

    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        invalidPlacement =
          headPosition.column + ship.length - 1 > 9 ||
          typeof this.#board[headPosition.row][headPosition.column + i] ===
            "object";
        //prettier-ignore
      } else if (orientation === "vertical") {
        invalidPlacement =
          headPosition.row + ship.length - 1 > 9 ||
          typeof this.#board[headPosition.row + i][headPosition.column] ===
            "object";
      }
      if (invalidPlacement) return true;
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
          if (this.placeShipFn(shipName, new Position(row, column))) break;
        }
      },
    );
  }

  // A position with no ship that has been targeted will be marked as 1
  receiveAttack(position) {
    const target = this.#board[position.row][position.column];
    if (target === 1) return false;

    if (target === 0) {
      this.#board[position.row][position.column] = 1;
    } else if (typeof target === "object") {
      target.hit();
    }
    return true;
  }

  allShipsSunk() {
    return this.#ships.filter((ship) => ship.isSunk()).length === 5;
  }
}

export { GameBoard };
