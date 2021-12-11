import styled from "styled-components";

import { WHITE } from "@src/common/constants/palette";

const Wrapper = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;
  ${({ isSelected }) =>
    `border-left: 0.16rem solid ${isSelected ? WHITE : "transparent"}`};
`;

export default {
  Wrapper,
};
