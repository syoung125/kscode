import styled from "styled-components";

import { P } from "@src/components/common/atoms";

const Wrapper = styled.div`
  width: 100%;

  padding: 0.6rem 1.6rem;
`;

const Path = styled(P)`
  width: 60%;

  font-weight: 300;
  color: ${({ theme }) => theme.colors.scheme.$gray100};

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default {
  Wrapper,
  Path,
};
