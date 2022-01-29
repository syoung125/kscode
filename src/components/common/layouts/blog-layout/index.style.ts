import styled from "styled-components";

import { BLUE, GRAY_300 } from "@src/common/constants/palette";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
  color: ${({ theme }) => theme.colors.scheme.$white};
`;

const Header = styled.header`
  flex-shrink: 0;

  height: 1.6rem;
  background-color: ${GRAY_300};
`;

const Row = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;

  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;

  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
`;

const Footer = styled.footer`
  flex-shrink: 0;

  height: 1.6rem;
  background-color: ${BLUE};
`;

export default {
  Wrapper,
  Header,
  Row,
  Main,
  Footer,
};
