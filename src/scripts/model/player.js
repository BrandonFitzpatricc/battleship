import { GameBoard } from "./game-board.js";

class Player {
  #gameBoard;

  constructor() {
    this.#gameBoard = new GameBoard();
  }

  get gameBoard() {
    return this.#gameBoard;
  }
}

class RealPlayer extends Player {
  constructor() {
    super();
  }
}

export { RealPlayer };
