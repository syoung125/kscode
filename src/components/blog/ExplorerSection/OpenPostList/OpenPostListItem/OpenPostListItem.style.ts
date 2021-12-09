import styled from "styled-components";

const Wrapper = styled.li<{ isSelected: boolean; height: string }>`
  ${({ height, isSelected, theme }) => `
  display: flex;
  flex-direction: Row;
  align-items: center;

  height: ${height};
  padding: 0 1.2rem;

  ${
    isSelected
      ? `background-color: ${theme.colors.scheme.$gray200};`
      : `&:hover { 
            background-color: ${theme.colors.scheme.$gray300};
         }`
  }
`}
`;

const Title = styled.p`
  padding-left: 0.4rem;

  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default {
  Wrapper,
  Title,
};
