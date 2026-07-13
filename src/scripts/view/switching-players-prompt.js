import {
  createElement,
  createTextElement,
  Attribute,
} from "./element-factory.js";

const loadSwitchingPlayersPrompt = () => {
  const switchingPlayersPrompt = createElement("div", "prompt");

  const content = loadContent();

  switchingPlayersPrompt.appendChild(content);

  document.body.append(switchingPlayersPrompt);
};

function loadContent() {
  const content = createElement("div", "content");

  const promptText = createTextElement(
    "div",
    "prompt-text",
    "Pass the device to the other player before continuing. Don't look at their screen!",
  );

  const continueBtn = createTextElement(
    "button",
    "text-btn",
    "Continue",
    new Attribute("id", "continue-btn"),
  );

  content.append(promptText, continueBtn);

  return content;
}

export { loadSwitchingPlayersPrompt };
