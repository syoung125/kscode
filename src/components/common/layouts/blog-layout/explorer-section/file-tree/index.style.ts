import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray200}`};
`;

export default {
  Wrapper,
};
