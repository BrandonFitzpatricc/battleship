import { Position } from "./position.js";

class Player {
  #gameBoard;
  #isActive;

  constructor(gameBoard, isActive) {
    this.#gameBoard = gameBoard;
    this.#isActive = isActive;
  }

  get gameBoard() {
    return this.#gameBoard;
  }

  get isActive() {
    return this.#isActive;
  }

  set isActive(value) {
    this.#isActive = value;
  }
}

class RealPlayer extends Player {
  constructor(gameBoard, isActive) {
    super(gameBoard, isActive);
  }
}

class ComputerPlayer extends Player {
  // This array will function similarly to a queue. When the computer player hits a ship for
  // the first time, it will be pushed into the queue. The computer player will target
  // the first ship in the queue until it is destroyed, then that ship will be dequeued.
  // This ensures that if the computer player hits a new ship while in the middle of targeting
  // another, each of the two ships will be destroyed one at a time.
  #damagedShips = [];

  constructor(gameBoard, isActive) {
    super(gameBoard, isActive);
  }

  attack(gameBoard) {
    const targetShip = this.#damagedShips[0];

    // This algorithm uses a probability map to determine which position is most likely to
    // contain a ship, then attacks that position.
    let probabilityMap;

    // prettier-ignore
    if (this.#damagedShips.length > 0 && targetShip.previousSuccessfulAttack.orientation) {
      probabilityMap =
        targetShip.previousSuccessfulAttack.orientation === "horizontal"
          ? this.#getHorizontalProbabilityMap(gameBoard)
          : this.#getVerticalProbabilityMap(gameBoard);
    } else {
      probabilityMap = this.#getProbabilityMap(gameBoard);
    }

    let highestProbability = 0;
    let attackRow = 0;
    let attackColumn = 0;
    let attackOrientation;

    if (this.#damagedShips.length === 0) {
      for (let i = 0; i < probabilityMap.length; i++) {
        for (let j = 0; j < probabilityMap[i].length; j++) {
          if (probabilityMap[i][j] > highestProbability) {
            highestProbability = probabilityMap[i][j];
            attackRow = i;
            attackColumn = j;
          }
        }
      }
      // Once a ship has been hit for the first time, the algorithm will first check the probability
      // of every adjacent position and attack the one with the highest probability. This will
      // repeat until a second hit has been made.

      // Once a ship has been hit for a second time, the algorithm will lock its orientation
      // and check the probabilities of the closest possible positions in each direction, attacking
      // the position with the highest probability. This will repeat until the ship
      // has been sunk.
    } else {
      for (let i = -1; i <= 1; i += 2) {
        const previousSuccessfulAttack = targetShip.previousSuccessfulAttack;

        // prettier-ignore
        if (previousSuccessfulAttack.orientation !== "vertical") {
          checkTargetProbability("column", targetShip, i);
        }

        // prettier-ignore
        if (previousSuccessfulAttack.orientation !== "horizontal") {
          checkTargetProbability("row", targetShip, i);
        }
      }
    }

    if (gameBoard.receiveAttack(attackRow, attackColumn)) {
      if (gameBoard.board[attackRow][attackColumn].length > 1) {
        const hitShip = gameBoard.board[attackRow][attackColumn][1];

        const damagedShip = this.#damagedShips.find(
          (ship) => ship.name === hitShip.name,
        );

        // prettier-ignore
        if (hitShip.isSunk()) {
          this.#damagedShips.splice(this.#damagedShips.indexOf(damagedShip), 1);
          
        } else if (!damagedShip) {
          this.#damagedShips.push({
          name: hitShip.name,
          previousSuccessfulAttack: new SuccessfulAttack(
            new Position(attackRow, attackColumn),
          ),
          failedAttackPositions: []
        });

        } else {
          damagedShip.previousSuccessfulAttack = new SuccessfulAttack(
            new Position(attackRow, attackColumn),
            attackOrientation,
          );
        }

        if (!gameBoard.allShipsSunk()) {
          this.attack(gameBoard);
        }
      }
    } else {
      // This is a safeguard to prevent unique cases where the computer gets stuck repeatedly
      // attacking a position where an attack has failed while targeting a ship.
      targetShip.failedAttackPositions.push(
        new Position(attackRow, attackColumn),
      );
    }

    function checkTargetProbability(type, targetShip, offset) {
      const initialOffset = offset;

      let target, targetRow, targetColumn;

      do {
        targetRow =
          type === "row"
            ? targetShip.previousSuccessfulAttack.position.row + offset
            : targetShip.previousSuccessfulAttack.position.row;

        targetColumn =
          type === "column"
            ? targetShip.previousSuccessfulAttack.position.column + offset
            : targetShip.previousSuccessfulAttack.position.column;

        const outOfBounds =
          targetRow > 9 ||
          targetRow < 0 ||
          targetColumn > 9 ||
          targetColumn < 0;

        if (outOfBounds) return;

        target = gameBoard.board[targetRow][targetColumn];

        if (target[1]) {
          if (target[1].name !== targetShip.name) break;
        }

        offset = initialOffset < 0 ? offset - 1 : offset + 1;
      } while (target[0] === 1 && target[1]);

      const targetProbability = probabilityMap[targetRow][targetColumn];

      if (targetProbability > highestProbability) {
        if (targetShip.failedAttackPositions.length > 0) {
          for (let position of targetShip.failedAttackPositions) {
            if (
              JSON.stringify([targetRow, targetColumn]) ===
              JSON.stringify(position.getPosition())
            ) {
              return;
            }
          }
        }

        attackRow = targetRow;
        attackColumn = targetColumn;

        highestProbability = probabilityMap[attackRow][attackColumn];
        attackOrientation = type === "column" ? "horizontal" : "vertical";
      }
    }
  }

  #getHorizontalProbabilityMap(gameBoard) {
    return this.#getProbabilityMap(gameBoard, "horizontal");
  }

  #getVerticalProbabilityMap(gameBoard) {
    return this.#getProbabilityMap(gameBoard, "vertical");
  }

  #getProbabilityMap(gameBoard, orientation) {
    const probabilityMap = [
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
    const board = gameBoard.board;

    const remainingShips = gameBoard.ships.filter((ship) => !ship.isSunk());
    remainingShips.forEach((ship) => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          const headPosition = new Position(i, j);
          //prettier-ignore
          if (this.#couldBePlacedHorizontally(board, ship, headPosition) && orientation !== "vertical") {
            for (let k = 0; k < ship.length; k++) {
              probabilityMap[headPosition.row][headPosition.column + k]++;
            }
          }

          //prettier-ignore
          if (this.#couldBePlacedVertically(board, ship, headPosition) && orientation !== "horizontal") {
            for (let k = 0; k < ship.length; k++) {
              probabilityMap[headPosition.row + k][headPosition.column]++;
            }
          }
        }
      }
    });
    return probabilityMap;
  }

  #couldBePlacedHorizontally(board, ship, headPosition) {
    return this.#couldBePlaced(board, ship, headPosition, "horizontal");
  }

  #couldBePlacedVertically(board, ship, headPosition) {
    return this.#couldBePlaced(board, ship, headPosition, "vertical");
  }

  #couldBePlaced(board, ship, headPosition, orientation) {
    for (let i = 0; i < ship.length; i++) {
      let currentPosition;
      let couldNotBePlaced;

      if (orientation === "horizontal") {
        currentPosition = board[headPosition.row][headPosition.column + i];
        couldNotBePlaced =
          (currentPosition[0] === 1 && currentPosition.length === 1) ||
          headPosition.column + ship.length - 1 > 9;
      } else if (orientation === "vertical") {
        currentPosition = board[headPosition.row + i][headPosition.column];
        couldNotBePlaced =
          (currentPosition[0] === 1 && currentPosition.length === 1) ||
          headPosition.row + ship.length - 1 > 9;
      }

      if (!couldNotBePlaced && currentPosition.length > 1) {
        couldNotBePlaced = currentPosition[1].isSunk();
      }

      if (couldNotBePlaced) return false;
    }
    return true;
  }
}

// This class is used by computer players to help determine subsequent attacks
// after hitting a ship.
class SuccessfulAttack {
  #position;
  #orientation;

  constructor(position, orientation) {
    this.#position = position;
    this.#orientation = orientation;
  }

  get position() {
    return this.#position;
  }

  get orientation() {
    return this.#orientation;
  }
}

export { RealPlayer, ComputerPlayer };
