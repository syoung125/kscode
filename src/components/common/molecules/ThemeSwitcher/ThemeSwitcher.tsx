import { useThemeContext } from "@src/common/contexts/theme";

import Style from "./ThemeSwitcher.style";

export default function ThemeSwitcher() {
  const {
    state: { theme },
    action: { toggleTheme },
  } = useThemeContext();

  return (
    <Style.Wrapper onClick={toggleTheme}>
      <span>🌝</span>
      <span>🌞</span>
      <Style.Circle mode={theme} />
    </Style.Wrapper>
  );
}
