import { ReactNode, useRef, useState, KeyboardEvent } from "react";
import styled from "styled-components";

import { BLUE, GRAY_300 } from "@src/constants/palette";

import ActivityBar, { ACTION_ITEMS } from "./activity-bar";
import SideBar from "./side-bar";

export type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  const [currentActionItem, setCurrentActionItem] = useState<number | null>(
    null
  );

  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleActivityBarKeyDown = (e: KeyboardEvent) => {
    if (["ArrowRight", "Right"].includes(e.key)) {
      sideBarRef.current?.focus();
    }
  };

  return (
    <Wrapper>
      <Header />
      <Row>
        <ActivityBar
          currentActionItem={currentActionItem}
          onCurrentActionItemChange={setCurrentActionItem}
          onKeyDown={handleActivityBarKeyDown}
        />
        {currentActionItem != null && (
          <SideBar
            ref={sideBarRef}
            label={ACTION_ITEMS[currentActionItem].label}
            content={ACTION_ITEMS[currentActionItem].content}
            onClose={() => setCurrentActionItem(null)}
          />
        )}
        <Main>{children}</Main>
      </Row>
      <Footer />
    </Wrapper>
  );
}

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

  overflow-x: hidden;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
`;

const Footer = styled.footer`
  flex-shrink: 0;

  height: 1.6rem;
  background-color: ${BLUE};
`;
