import { createElement, createTextElement } from "./element-factory.js";
import { Attribute } from "./attribute.js";

const loadGameOverPrompt = () => {
  const gameOverPrompt = createElement("div", "prompt");

  const content = loadContent();

  gameOverPrompt.appendChild(content);

  document.body.append(gameOverPrompt);
};

function loadContent() {
  const content = createElement("div", "content");

  const playAgainBtn = createTextElement(
    "button",
    "text-btn play-again",
    "Play Again",
  );

  const backToMenuBtn = createTextElement(
    "button",
    "text-btn back-to-menu",
    "Back to Menu",
  );

  const closeBtn = createElement(
    "button",
    "close-btn",
    new Attribute("id", "close-prompt"),
  );

  content.append(playAgainBtn, backToMenuBtn, closeBtn);

  return content;
}

export { loadGameOverPrompt };
