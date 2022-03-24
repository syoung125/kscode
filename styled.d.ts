import { ColorTheme } from "@src/themes/types";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTheme;
  }
}
