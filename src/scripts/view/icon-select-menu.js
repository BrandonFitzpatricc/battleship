import {
  createElement,
  createTextElement,
  createIconBtn,
} from "./element-factory";

import { Attribute } from "./attribute";

import { playerIcons, buttonIcons } from "./icon-manager";

const loadIconSelectMenu = (playerNumber) => {
  const mainContent = document.querySelector(".main-content");

  mainContent.textContent = "";

  const iconSelectMenu = createElement("div", "icon-select-menu");

  // prettier-ignore
  const headerTop = createTextElement("div", "header", `Player ${playerNumber}`);
  const headerBottom = createTextElement("div", "header", "Choose Your Icon");
  const iconSelectionBtns = loadIconSelectionBtns();

  const randomBtn = createIconBtn(
    "random selection-btn",
    "random-icon",
    buttonIcons["randomize"],
    100,
  );

  const confirmBtn = createTextElement(
    "button",
    "text-btn",
    "Confirm",
    new Attribute("id", "confirm"),
  );

  iconSelectMenu.append(
    headerTop,
    headerBottom,
    iconSelectionBtns,
    randomBtn,
    confirmBtn,
  );

  mainContent.appendChild(iconSelectMenu);
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

    const btn = createIconBtn("selection-btn", iconName, icon, 100);

    listItem.appendChild(btn);

    iconSelectionBtns.appendChild(listItem);
  }

  return iconSelectionBtns;
}

export { loadIconSelectMenu };
