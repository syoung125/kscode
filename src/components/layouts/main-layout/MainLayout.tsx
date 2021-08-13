import { PropsWithChildren, useState } from "react";
import styled from "styled-components";

import {
  GHeader,
  GActivityBar,
  GSideBar,
  GEditorContainer,
  GFooter,
} from "@src/components/common/organisms";

export type MainLayoutProps = PropsWithChildren<{}>;

function MainLayout({ children }: MainLayoutProps) {
  const [currentActionItem, setCurrentActionItem] = useState<number | null>(0);

  const handleActionItemClick = (index: number) => () => {
    if (index === currentActionItem) {
      setCurrentActionItem(null);
      return;
    }
    setCurrentActionItem(index);
  };

  return (
    <Wrapper>
      <GHeader />
      <MainContentsWrapper>
        <GActivityBar
          currentActionItem={currentActionItem}
          onItemClick={handleActionItemClick}
        />
        <GSideBar currentActionItem={currentActionItem} />
        <GEditorContainer>{children}</GEditorContainer>
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
