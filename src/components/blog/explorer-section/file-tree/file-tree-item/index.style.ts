import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Li = styled.li<{ isSelected?: boolean; isFile?: boolean }>`
  display: flex;
  align-items: center;

  padding: 0.4rem 0.2rem;
  ${({ isFile }) => (isFile ? "padding-left: 1.4rem;" : "")};

  ${({ theme }) =>
    `&:hover { 
          background-color: ${theme.colors.scheme.$gray300};
       }`}
  ${({ isSelected, theme }) =>
    isSelected ? `background-color: ${theme.colors.scheme.$gray200};` : ``};
`;

const Title = styled.p`
  font-size: 0.8rem;
  font-weight: 700;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Ul = styled.ul`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray200}`};
`;

export default {
  Wrapper,
  Li,
  Title,
  Ul,
};
