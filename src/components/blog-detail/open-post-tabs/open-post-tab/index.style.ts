import styled from "styled-components";

const Wrapper = styled.li<{ isSelected: boolean }>`
  ${({ isSelected, theme }) => `
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 2.4rem;
    padding: 0 0.8rem;
    margin-right: 0.1rem;

    background-color:
      ${isSelected ? theme.colors.scheme.$gray600 : theme.colors.scheme.$gray400};
    color: ${
      isSelected ? theme.colors.scheme.$white : theme.colors.scheme.$gray100
    };
  `}
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  width: 8rem;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default {
  Wrapper,
  Title,
};
