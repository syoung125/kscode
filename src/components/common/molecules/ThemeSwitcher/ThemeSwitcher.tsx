import Style from "./ThemeSwitcher.style";

export type ThemeType = "light" | "dark";

export type ThemeSwitcherProps = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export default function ThemeSwitcher({
  theme,
  toggleTheme,
}: ThemeSwitcherProps) {
  return (
    <Style.Wrapper onClick={toggleTheme}>
      <span>🌝</span>
      <span>🌞</span>
      <Style.Circle mode={theme} />
    </Style.Wrapper>
  );
}
