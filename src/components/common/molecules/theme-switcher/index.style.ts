import styled from "styled-components";

import { BLACK, WHITE } from "@src/common/constants/palette";

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 1.2rem;
  height: 2.8rem;

  border-radius: 0.6rem;
  outline: 2px solid ${BLACK};

  background-color: ${BLACK};
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

export default {
  Wrapper,
  Circle,
};
