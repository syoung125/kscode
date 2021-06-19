import React from "react";
import styled from "styled-components";

import { BLUE } from "@src/asset/colors";

function GFooter() {
  return <Wrapper></Wrapper>;
}

export default React.memo(GFooter);

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1.6rem;
  background-color: ${BLUE};
`;
