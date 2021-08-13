import React from "react";
import styled from "styled-components";

export const GFooterHeight = "1.6rem";

function GFooter() {
  return <Wrapper />;
}

export default GFooter;

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: ${GFooterHeight};
  background-color: ${({ theme }) => theme.colors.semanticScheme.footerBg};
`;
