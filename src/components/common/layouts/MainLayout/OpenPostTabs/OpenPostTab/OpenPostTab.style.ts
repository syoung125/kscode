import styled from "styled-components";

import { P } from "@src/components/common/atoms";

const Wrapper = styled.li<{ isSelected: boolean }>`
  ${({ isSelected, theme }) => `
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 2.4rem;
  padding: 0 0.8rem;
  margin-right: 0.1rem;

  background-color:
    ${isSelected ? theme.colors.scheme.$gray500 : theme.colors.scheme.$gray300};
  color: ${theme.colors.scheme.$white};
  opacity: ${isSelected ? 1 : 0.4};
`}
`;

const Emoji = styled(P).attrs({})`
  margin-right: 0.8rem;
`;

const Title = styled(P).attrs({
  ellipsis: true,
  preWrap: true,
})`
  margin-right: 0.8rem;
  width: 8rem;
`;

export default {
  Wrapper,
  Emoji,
  Title,
};
