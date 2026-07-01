class Player {
  #gameBoard;

  constructor(gameBoard) {
    this.#gameBoard = gameBoard;
  }

  get gameBoard() {
    return this.#gameBoard;
  }
}

class RealPlayer extends Player {
  constructor(gameBoard) {
    super(gameBoard);
  }
}

class ComputerPlayer extends Player {
  constructor(gameBoard) {
    super(gameBoard);
  }
}

export { RealPlayer, ComputerPlayer };
