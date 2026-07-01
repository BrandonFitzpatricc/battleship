import { GameBoard } from "./game-board.js";

class RealPlayer {
  #gameBoard;

  constructor() {
    this.#gameBoard = new GameBoard();
  }

  get gameBoard() {
    return this.#gameBoard;
  }
}

export { RealPlayer };
