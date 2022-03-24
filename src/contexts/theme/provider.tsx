import { ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";

import { light, dark } from "@src/themes";

import { IThemeContext, ThemeContext, ThemeType } from "./context";

export type ThemeContextProviderProps = {
  defaultTheme: ThemeType;
  children: ReactNode;
};

export default function ThemeContextProvider({
  defaultTheme,
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeStore: IThemeContext = {
    state: {
      theme,
    },
    action: {
      toggleTheme,
    },
  };

  return (
    <ThemeProvider theme={{ colors: theme === "light" ? light : dark }}>
      <ThemeContext.Provider value={themeStore}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
