import styled from "styled-components";

import { GRAY_400 } from "@src/common/constants/palette";

const Wrapper = styled.nav`
  min-width: 3rem;
  background-color: ${GRAY_400};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default {
  Wrapper,
};
