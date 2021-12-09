import {
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_400,
  GRAY_500,
  GRAY_600,
  WHITE,
} from "@src/common/constants/palette";

import { ColorTheme } from "./types";

export const dark: Readonly<ColorTheme> = Object.freeze({
  scheme: {
    $white: WHITE,

    $gray100: GRAY_100,
    $gray200: GRAY_200,
    $gray300: GRAY_300,
    $gray400: GRAY_400,
    $gray500: GRAY_500,
    $gray600: GRAY_600,
  },
  semanticScheme: {
    sideBarBg: GRAY_500,
    mainBg: GRAY_600,
  },
});
