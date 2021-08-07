import { ColorTheme } from "@src/common/constants/colors";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTheme;
  }
}
