import styled from "styled-components";

import GActivityBar from "./g-activitybar";
import GSideBar from "./g-sidebar";

export type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Wrapper>
      <GActivityBar />
      <GSideBar />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
}

export default MainLayout;

const Wrapper = styled.div`
  display: flex;

  height: 100vh;
  background-color: rgb(30, 30, 30);
  color: white;
`;

const ContentWrapper = styled.div``;
