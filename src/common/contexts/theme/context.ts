import { createContext, useContext } from "react";

export type ThemeType = "dark" | "light";

export interface IThemeContext {
  state: {
    theme: ThemeType;
  };
  action: {
    toggleTheme: () => void;
  };
}

export const ThemeContext = createContext<IThemeContext>(undefined!);

export const useThemeContext = () => useContext(ThemeContext);
