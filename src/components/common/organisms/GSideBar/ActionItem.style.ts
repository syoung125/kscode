import styled from "styled-components";

const Wrapper = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  margin-bottom: 0.4rem;
  ${({ isSelected, theme }) =>
    `border-left: 0.16rem solid ${
      isSelected ? theme.colors.scheme.$white : "transparent"
    }`};
`;

export default {
  Wrapper,
};
