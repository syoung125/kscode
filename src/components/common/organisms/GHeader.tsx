import React from "react";
import styled from "styled-components";

export const GHeaderHeight = "1.6rem";

function GHeader() {
  return <Wrapper />;
}

export default GHeader;

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: ${GHeaderHeight};
  background-color: ${({ theme }) => theme.colors.semanticScheme.headerBg};
`;
