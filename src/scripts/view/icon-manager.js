import boxingGlove from "../../icons/player-icons/boxing-glove.svg";
import butterfly from "../../icons/player-icons/butterfly.svg";
import brain from "../../icons/player-icons/brain.svg";
import bullseye from "../../icons/player-icons/bullseye.svg";
import heart from "../../icons/player-icons/heart.svg";

import randomize from "../../icons/button-icons/randomize.svg";
import trash from "../../icons/button-icons/trash.svg";
import rotate from "../../icons/button-icons/rotate.svg";
import play from "../../icons/button-icons/play.svg";

import { Icon } from "./icon";

const playerIcons = {
  "boxing-glove": new Icon(boxingGlove, "icon of a boxing glove"),
  butterfly: new Icon(butterfly, "icon of a butterfly"),
  brain: new Icon(brain, "icon of a brain"),
  bullseye: new Icon(bullseye, "icon of a bullseye"),
  heart: new Icon(heart, "icon of a heart"),
};

const buttonIcons = {
  randomize: new Icon(randomize, "icon of shuffle arrows"),
  trash: new Icon(trash, "icon of a trash can"),
  rotate: new Icon(rotate, "icon of rotation arrows"),
  play: new Icon(play, "play icon"),
};

export { playerIcons, buttonIcons };
