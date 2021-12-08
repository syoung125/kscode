import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 2.4rem;
  background-color: ${({ theme }) => theme.colors.scheme.$gray400};

  overflow-y: auto;
`;

export default {
  Wrapper,
};
