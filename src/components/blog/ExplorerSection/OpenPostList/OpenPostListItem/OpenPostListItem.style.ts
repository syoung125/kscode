import styled from "styled-components";

import { P } from "@src/components/common/atoms";

const Wrapper = styled.li<{ isSelected: boolean; height: string }>`
  ${({ height, isSelected, theme }) => `
display: flex;
  flex-direction: Row;
  align-items: center;

  height: ${height};
  padding-left: 2rem;

  ${
    isSelected
      ? `background-color: ${theme.colors.scheme.$gray100};`
      : `&:hover { 
            background-color: ${theme.colors.scheme.$gray200};
         }`
  }
`}
`;

const Emoji = styled(P)`
  padding-left: 0.4rem;
`;

const Title = styled(P)`
  padding-left: 0.4rem;
`;

export default {
  Wrapper,
  Emoji,
  Title,
};
