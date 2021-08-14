import styled from "styled-components";

import OpenPostsTab from "../../editor-container/OpenPostListTab";

export type GPostContainerProps = {
  children: React.ReactNode;
};

function GPostContainer({ children }: GPostContainerProps) {
  return (
    <Wrapper>
      <OpenPostsTab />
      <Breadcrumbs></Breadcrumbs>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
}

export default GPostContainer;

const Wrapper = styled.section`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.semanticScheme.mainBg};
`;

const Breadcrumbs = styled.div`
  height: 1.6rem;
`;

const ContentWrapper = styled.article`
  padding: 1.6rem;
`;
