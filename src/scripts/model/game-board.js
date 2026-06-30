import { Ship } from "./ship.js";

class GameBoard {
  #board;
  #ships;

  constructor() {
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

  // headPosition is the leftmost ship position if the orientation is horizontal, or the topmost
  // ship position if the orientation is vertical
  placeShip(name, headPosition, orientation) {
    const ship = new Ship(name);
    this.#ships.push(ship);
  }

  get board() {
    return this.#board;
  }

  get ships() {
    return this.#ships;
  }
}

export { GameBoard };
