import { ColorTheme } from "../types";
import { populateSemanticColors } from "../utils";

const darkScheme: ColorTheme["scheme"] = {
  $white: "#FFF",

  $gray100: "#505050",
  $gray200: "#3c3c3c",
  $gray300: "#333333",
  $gray400: "#252526",
  $gray500: "#1e1e1e",

  $blue: "#007fd4",
};

const darkSemanticScheme: ColorTheme["semanticScheme"] = populateSemanticColors(
  darkScheme,
  {
    headerBg: "$gray200",
    activityBarBg: "$gray300",
    sideBarBg: "$gray400",
    mainBg: "$gray500",
    footerBg: "$blue",
  }
);

export const dark: Readonly<ColorTheme> = Object.freeze({
  scheme: darkScheme,
  semanticScheme: darkSemanticScheme,
});
