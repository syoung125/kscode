import { KeyboardEvent } from "react";

import { useThemeContext } from "@src/common/contexts/theme";

import Style from "./index.style";

export default function ThemeSwitcher() {
  const {
    state: { theme },
    action: { toggleTheme },
  } = useThemeContext();

  const handleClick = () => {
    toggleTheme();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (["Enter", " "].includes(e.key)) {
      handleClick();
    }
  };

  return (
    <Style.Wrapper tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
      <span>🌝</span>
      <span>🌞</span>
      <Style.Circle mode={theme} />
    </Style.Wrapper>
  );
}
