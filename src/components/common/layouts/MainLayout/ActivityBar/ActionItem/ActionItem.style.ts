import styled from "styled-components";

import { WHITE } from "@src/common/constants/palette";

const Wrapper = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  margin-bottom: 0.4rem;
  ${({ isSelected }) =>
    `border-left: 0.16rem solid ${isSelected ? WHITE : "transparent"}`};
`;

export default {
  Wrapper,
};
