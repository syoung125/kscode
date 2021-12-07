import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ActivityBar = styled.nav`
  min-width: 3rem;
  background-color: ${({ theme }) => theme.colors.semanticScheme.activityBarBg};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default {
  Wrapper,
  ActivityBar,
};
