import { Attribute } from "./attribute";

const createElement = (type, className, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createTextElement = (type, className, textContent, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createIconBtn = (className, id, src, alt, dimensions) => {
  const btn = createElement("button", className, new Attribute("id", id));
  btn.appendChild(createIcon("option icon", src, alt, dimensions));
  return btn;
};

const createPlayerIcon = (src, alt, dimensions) => {
  const playerIconContainer = createElement("div", "player-icon-container");
  // prettier-ignore
  playerIconContainer.appendChild(createIcon("player icon", src, alt, dimensions));
  return playerIconContainer;
};

const createGameBoard = () => {
  const gameBoard = createElement("div", "game-board");
  for (let i = 0; i < 100; i++) {
    gameBoard.appendChild(createElement("div", "square"));
  }
  return gameBoard;
};

function createIcon(className, src, alt, dimensions) {
  const icon = createElement(
    "img",
    className,
    new Attribute("src", src),
    new Attribute("alt", alt),
    new Attribute("width", dimensions),
    new Attribute("height", dimensions),
  );

  return icon;
}

export {
  createElement,
  createTextElement,
  createIconBtn,
  createPlayerIcon,
  createGameBoard,
};
