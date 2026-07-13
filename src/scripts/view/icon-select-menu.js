import {
  createElement,
  createTextElement,
  createIconBtn,
  Attribute,
} from "./element-factory";

import { playerIcons, buttonIcons } from "./icon-manager";

const loadIconSelectMenu = () => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "icon-select-menu");

  const header = createTextElement("div", "header", "Choose Your Icon");
  const iconSelectionBtns = loadIconSelectionBtns();

  const randomBtn = createIconBtn(
    "random selection-btn",
    "random-icon",
    buttonIcons["randomize"].src,
    buttonIcons["randomize"].alt,
    100,
  );

  const confirmBtn = createTextElement(
    "button",
    "text-btn",
    "Confirm",
    new Attribute("id", "confirm"),
  );

  mainContainer.append(header, iconSelectionBtns, randomBtn, confirmBtn);

  document.body.appendChild(mainContainer);
};

function loadIconSelectionBtns() {
  const iconSelectionBtns = createElement(
    "ul",
    "icon-selection-btns",
    new Attribute("role", "list"),
  );

  for (const iconName in playerIcons) {
    const icon = playerIcons[iconName];

    const listItem = createElement("li", "");

    const btn = createIconBtn(
      "selection-btn",
      iconName,
      icon.src,
      icon.alt,
      100,
    );

    if (iconName === "boxing-glove") btn.className += " selected";

    listItem.appendChild(btn);

    iconSelectionBtns.appendChild(listItem);
  }

  return iconSelectionBtns;
}

export { loadIconSelectMenu };
