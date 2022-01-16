import { ColorTheme } from "@src/common/themes/types";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTheme;
  }
}
