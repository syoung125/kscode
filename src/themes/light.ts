import {
  GRAY_100,
  GRAY_600,
  LIGHT_GRAY_100,
  LIGHT_GRAY_200,
  LIGHT_GRAY_300,
  LIGHT_GRAY_400,
  WHITE,
} from "@src/constants/palette";

import { ColorTheme } from "./types";

export const light: Readonly<ColorTheme> = Object.freeze({
  scheme: {
    $white: GRAY_600,

    $gray100: GRAY_100,
    $gray200: LIGHT_GRAY_400,
    $gray300: LIGHT_GRAY_300,
    $gray400: LIGHT_GRAY_200,
    $gray500: LIGHT_GRAY_100,
    $gray600: WHITE,
  },
  semanticScheme: {
    sideBarBg: LIGHT_GRAY_100,
    mainBg: WHITE,
  },
});
