import boxingGlove from "../../icons/player-icons/boxing-glove.svg";
import butterfly from "../../icons/player-icons/butterfly.svg";
import brain from "../../icons/player-icons/brain.svg";
import bullseye from "../../icons/player-icons/bullseye.svg";
import heart from "../../icons/player-icons/heart.svg";

import randomize from "../../icons/button-icons/randomize.svg";
import trash from "../../icons/button-icons/trash.svg";
import rotate from "../../icons/button-icons/rotate.svg";
import play from "../../icons/button-icons/play.svg";

const playerIcons = {
  "boxing-glove": { src: boxingGlove, alt: "icon of a boxing glove" },
  butterfly: { src: butterfly, alt: "icon of a butterfly" },
  brain: { src: brain, alt: "icon of a brain" },
  bullseye: { src: bullseye, alt: "icon of a bullseye" },
  heart: { src: heart, alt: "icon of a heart" },
};

const buttonIcons = {
  randomize: { src: randomize, alt: "icon of shuffle arrows" },
  trash: { src: trash, alt: "icon of a trash can" },
  rotate: { src: rotate, alt: "icon of rotation arrows" },
  play: { src: play, alt: "play icon" },
};

export { playerIcons, buttonIcons };
