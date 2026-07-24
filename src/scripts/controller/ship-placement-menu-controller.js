import { loadShipPlacementMenu } from "../view/ship-placement-menu.js";

import { Position } from "../model/position.js";
import { GameBoard } from "../model/game-board.js";
import { GameHandler } from "../model/game-handler.js";

import { initializeGameScreen } from "./game-screen-controller.js";

const initializeShipPlacementMenu = (players, gameBoard) => {
  loadShipPlacementMenu(players[0], gameBoard);

  let shipBeingDragged;
  let distanceFromHead;
  let successfullyPlaced = false;

  initializeShipContainer();
  initializeSquares();
  initializeOptionBtns();

  function initializeShipContainer() {
    const shipContainer = document.querySelector(".ship-container");

    // shipContainer.querySelectorAll(".ship").forEach((ship) => {
    shipContainer.addEventListener("dragstart", (event) => {
      shipBeingDragged = event.target;
      shipBeingDragged.className = `dragged ${shipBeingDragged.className}`;

      const shipName = shipBeingDragged.id;
      // prettier-ignore
      gameBoard.selectedShip = gameBoard.unplacedShips.find(ship => ship.name === shipName);

      // When the user drops a ship onto the game board, the square received by the program is
      // the square that the cursor was hovered over. This is an issue if the cursor is anywhere
      // other than the head position of the ship, as this position is used for ship placement.
      // Calculating the relative position of the cursor to the ship when a drag operation initiates
      // allows the program to determine how far away the square received is from the head.

      // prettier-ignore
      const relativeCursorPositionX = event.clientX - event.target.getBoundingClientRect().x
      // prettier-ignore
      const relativeCursorPositionY = event.clientY - event.target.getBoundingClientRect().y;

      distanceFromHead =
        gameBoard.selectedShip.orientation === "vertical"
          ? Math.floor(relativeCursorPositionY / 75)
          : Math.floor(relativeCursorPositionX / 75);
    });

    shipContainer.addEventListener("dragend", (event) => {
      if (!successfullyPlaced) {
        // prettier-ignore
        event.target.className = event.target.className.replace("dragged ", "");

        // A dragged ship will move back to the ship container if it cannot be placed.
        // All ships in the ship container are oriented vertically, so the ships orientation
        // must be reset to vertical if it was rotated to horizontal.

        // prettier-ignore
        event.target.className = event.target.className.replace("horizontal", "vertical")

        const shipName = event.target.id;
        // prettier-ignore
        gameBoard.unplacedShips.find(ship => ship.name === shipName).orientation = "vertical"
      } else {
        initializeShipPlacementMenu(players, gameBoard);
      }
    });

    shipContainer.addEventListener("drag", (event) => {
      // If a ship is being re-placed, then the ship should be moved to its default position in
      // the ship container AFTER the user has started dragging it, in order to prevent a
      // confliction in the event that the user re-places the ship in the same spot.
      // (explained further in the initializeSquares method)

      const shipName = event.target.id;

      event.target.style.top =
        shipName === "carrier" || shipName === "destroyer" ? "0" : "auto";

      event.target.style.bottom =
        shipName === "battleship" || shipName === "patrol-boat" ? "0" : "auto";

      event.target.style.left =
        shipName === "carrier" || shipName === "battleship" ? "0" : "auto";

      event.target.style.right =
        shipName === "destroyer" ||
        shipName === "submarine" ||
        shipName === "patrol-boat"
          ? "0"
          : "auto";

      if (shipName === "submarine") event.target.style.top = "300px";
    });
    // });
  }

  function initializeSquares() {
    document
      .querySelector(".game-board")
      .querySelectorAll(".square")
      .forEach((square) => {
        square.addEventListener("dragover", (event) => {
          event.preventDefault();
        });

        square.addEventListener("drop", (event) => {
          let row = event.target.dataset.row;
          let column = event.target.dataset.column;

          row =
            gameBoard.selectedShip.orientation === "vertical"
              ? row - distanceFromHead
              : row;

          column =
            gameBoard.selectedShip.orientation === "horizontal"
              ? column - distanceFromHead
              : column;

          gameBoard.shipPlacementFn =
            gameBoard.selectedShip.orientation === "vertical"
              ? gameBoard.placeShipVertically
              : gameBoard.placeShipHorizontally;

          successfullyPlaced = gameBoard.shipPlacementFn(
            shipBeingDragged.id,
            new Position(row, column),
          );
        });

        square.addEventListener("mousedown", (event) => {
          if (event.target.className.includes("ship")) {
            const shipName = event.target.className.split(" ").at(-1);
            const headPosition = gameBoard.getHeadPosition(shipName);
            // prettier-ignore
            const ship = gameBoard.placedShips.find((ship) => ship.name === shipName);

            gameBoard.selectedShip = ship;
            gameBoard.removeShip(shipName);

            // When the user picks up a placed ship, the same ship div used to initially place it
            // will be made visible and moved directly over the position of the ship that's being
            // picked up, allowing the user to drag it. This is necessary because a single placed
            // ship is represented by multiple squares, and it's not possible to drag multiple
            // divs at once.

            // Much like when the user picks up a ship from the ship container, the
            // head position must be obtained to ensure that the draggable ship is moved
            // to the correct position regardless of where the user's cursor is when they
            // trigger this event.

            const headSquareCoordinates = document
              .querySelector(
                `[data-row="${headPosition.row}"][data-column="${headPosition.column}"]`,
              )
              .getBoundingClientRect();

            const squarePositionX =
              ship.orientation === "vertical"
                ? event.target.getBoundingClientRect().x
                : headSquareCoordinates.x;

            const squarePositionY =
              ship.orientation === "horizontal"
                ? event.target.getBoundingClientRect().y
                : headSquareCoordinates.y;

            initializeShipPlacementMenu(players, gameBoard);

            const shipElement = document.querySelector(`.${shipName}`);
            shipElement.className = `ship ${ship.name} ${ship.orientation}`;

            shipElement.style.left = "auto";
            shipElement.style.top = "auto";
            shipElement.style.bottom = "auto";
            shipElement.style.right = "auto";

            // prettier-ignore
            shipElement.style.left = squarePositionX - shipElement.getBoundingClientRect().x;
            // prettier-ignore
            shipElement.style.top = squarePositionY - shipElement.getBoundingClientRect().y;
          }
        });
      });
  }

  function initializeOptionBtns() {
    const optionBtnHandler = {
      randomize: () => {
        gameBoard.placeShipsRandomly();
        initializeShipPlacementMenu(players, gameBoard);
      },

      trash: () => {
        gameBoard.clearBoard();
        initializeShipPlacementMenu(players, gameBoard);
      },

      rotate: () => {
        gameBoard.rotateShip(gameBoard.selectedShip);
        initializeShipPlacementMenu(players, gameBoard);
      },

      play: () => {
        gameBoard.sortPlacedShips();
        players[0].gameBoard = gameBoard;

        const computerBoard = new GameBoard();
        computerBoard.placeShipsRandomly();
        players[1].gameBoard = computerBoard;

        GameHandler.startNewGame(players);
        initializeGameScreen();
      },
    };

    document
      .querySelector(".option-btns")
      .addEventListener("click", (event) => {
        optionBtnHandler[event.target.id]();
      });
  }
};

export { initializeShipPlacementMenu };
