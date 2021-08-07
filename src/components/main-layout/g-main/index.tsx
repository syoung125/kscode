import styled from "styled-components";

import OpenPostListTab from "./open-post-list-tab";
import Color from "@src/constants/colors";

export type GMainProps = {
  children: React.ReactNode;
};

function GMain({ children }: GMainProps) {
  return (
    <Wrapper>
      <OpenPostListTab />
      <Breadcrumbs></Breadcrumbs>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
}

export default GMain;

const Wrapper = styled.section`
  flex: 1;
  background-color: ${Color.Editor.background};
`;

const Breadcrumbs = styled.div`
  height: 1.6rem;
`;

const ContentWrapper = styled.div`
  padding: 1.6rem;
`;
