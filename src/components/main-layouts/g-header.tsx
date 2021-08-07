import React from "react";
import styled from "styled-components";

function GHeader() {
  return <Wrapper></Wrapper>;
}

export default React.memo(GHeader);

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1.6rem;
  background-color: ${({ theme }) => theme.colors.semanticScheme.headerBg};
`;
