import { KeyboardEvent } from "react";
import styled from "styled-components";

import { BLACK, WHITE } from "@src/constants/palette";

import { useThemeContext } from "@src/contexts/theme";

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
    <Wrapper tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
      <span>🌝</span>
      <span>🌞</span>
      <Circle mode={theme} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 1.2rem;
  height: 2.8rem;
  border-radius: 0.6rem;

  background-color: ${BLACK};

  outline: 2px solid ${BLACK};

  &:focus {
    outline: 2px solid ${WHITE};
  }
`;

const Circle = styled.div<{ mode: "light" | "dark" }>`
  position: absolute;
  ${({ mode }) => (mode === "light" ? "top: 0;" : "bottom: 0;")};

  width: 1.2rem;
  height: 1.2rem;

  border-radius: 50%;

  background-color: ${WHITE};

  transition: all 0.2s;

  user-select: auto;
`;
