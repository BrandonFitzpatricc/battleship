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
        this.#board[headPosition.row][headPosition.column + i].push(ship);
        //prettier-ignore
      } else if (orientation === "vertical") {
        this.#board[headPosition.row + i][headPosition.column].push(ship);
      }
    }
    this.#ships.push(ship);
    return true;
  }

  #invalidPlacement(ship, headPosition, orientation) {
    let invalidPlacement;

    for (let i = 0; i < ship.length; i++) {
      //prettier-ignore
      if (orientation === "horizontal") {
        invalidPlacement =
          headPosition.column + ship.length - 1 > 9 ||
          this.#board[headPosition.row][headPosition.column + i].length > 1;
          
      } else if (orientation === "vertical") {
        invalidPlacement =
          headPosition.row + ship.length - 1 > 9 ||
          this.#board[headPosition.row + i][headPosition.column].length > 1;
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
