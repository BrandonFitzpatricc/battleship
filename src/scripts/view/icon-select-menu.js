import {
  createElement,
  createTextElement,
  createIconBtn,
  Attribute,
} from "./element-factory";

import boxingGlove from "../../icons/player-icons/boxing-glove.svg";
import butterfly from "../../icons/player-icons/butterfly.svg";
import brain from "../../icons/player-icons/brain.svg";
import bullseye from "../../icons/player-icons/bullseye.svg";
import heart from "../../icons/player-icons/heart.svg";

import randomize from "../../icons/button-icons/randomize.svg";

const loadIconSelectMenu = () => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "icon-select-menu");

  const header = createTextElement("div", "header", "Choose Your Icon");
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

  const randomBtn = createIconBtn(
    "random selection-btn",
    "random-icon",
    randomize,
    "icon of shuffle arrows",
    100,
  );

  const confirmBtn = createTextElement(
    "button",
    "text-btn",
    "Confirm",
    new Attribute("id", "confirm"),
  );

  mainContainer.append(header, iconSelectionBtns, randomBtn, confirmBtn);

  document.body.append(mainContainer);
};

const playerIcons = {
  "boxing-glove": { src: boxingGlove, alt: "icon of a boxing glove" },
  butterfly: { src: butterfly, alt: "icon of a butterfly" },
  brain: { src: brain, alt: "icon of a brain" },
  bullseye: { src: bullseye, alt: "icon of a bullseye" },
  heart: { src: heart, alt: "icon of a heart" },
};

export { loadIconSelectMenu };
