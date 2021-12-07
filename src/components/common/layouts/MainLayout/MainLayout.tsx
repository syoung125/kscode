import { PropsWithChildren } from "react";
import styled from "styled-components";

import {
  GHeader,
  GSideBar,
  GPostContainer,
  GFooter,
} from "@src/components/common/organisms";

export type MainLayoutProps = PropsWithChildren<{}>;

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Wrapper>
      <GHeader />
      <MainContentsWrapper>
        <GSideBar />
        <GPostContainer>{children}</GPostContainer>
      </MainContentsWrapper>
      <GFooter />
    </Wrapper>
  );
}

export default MainLayout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
  color: ${({ theme }) => theme.colors.scheme.$white};
`;

const MainContentsWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
`;
