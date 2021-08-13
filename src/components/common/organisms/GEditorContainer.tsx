import styled from "styled-components";

import OpenPostListTab from "../../editor-container/OpenPostListTab";

export type GEditorContainerProps = {
  children: React.ReactNode;
};

function GEditorContainer({ children }: GEditorContainerProps) {
  return (
    <Wrapper>
      <OpenPostListTab />
      <Breadcrumbs></Breadcrumbs>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
}

export default GEditorContainer;

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
