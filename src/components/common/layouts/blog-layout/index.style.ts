import styled from "styled-components";

import { BLUE, GRAY_300 } from "@src/common/constants/palette";

export const HEADER_HEIGHT = "1.6rem";
export const FOOTER_HEIGHT = "1.6rem";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
  color: ${({ theme }) => theme.colors.scheme.$white};
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${HEADER_HEIGHT};
  background-color: ${GRAY_300};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});

  overflow: hidden;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;

  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${FOOTER_HEIGHT};
  background-color: ${BLUE};
`;

export default {
  Wrapper,
  Header,
  Row,
  Main,
  Footer,
};
