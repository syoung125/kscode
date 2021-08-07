import { WHITE } from "./palette";

export * from "./palette";

export const ActivityBar = {
  background: "#333333",
  foreground: WHITE,
  inactiveForeground: "rgba(255,255,255,0.4)",
};

export const List = {
  focusBackground: "rgb(80,80,80)",
  hoverBackground: "rgb(50,50,50)",
};

export const OpenPostListTab = {
  background: "rgb(37, 37, 38)",
  unfocused: {
    background: "#2D2D2D",
    foreground: "#FFFFFF80",
  },
  focused: {
    background: "#1E1E1E",
    foreground: WHITE,
  },
};

export const Editor = {
  background: "#1E1E1E",
};

const Color = {
  ActivityBar,
  List,
  OpenPostListTab,
  Editor,
};

export default Color;
