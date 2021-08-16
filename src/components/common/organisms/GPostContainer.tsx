import styled from "styled-components";

import { Tabs, TabItemType, TabsActionType } from "../molecules";
import EllipsisIcon from "@src/components/common/icons/ellipsis";

import { useAppContext } from "@src/common/contexts/app";

const TAB_ACTIONS: TabsActionType[] = [
  {
    Icon: EllipsisIcon,
    onClick: () => null,
  },
];

export type GPostContainerProps = {
  children: React.ReactNode;
};

function GPostContainer({ children }: GPostContainerProps) {
  const {
    state: { openPostSlugs, currentSlugs },
    action: { selectPost, closePost },
  } = useAppContext();

  const tabItems: TabItemType[] = openPostSlugs.map(({ id, slug }) => ({
    title: slug,
    isSelected: currentSlugs?.id === id,
    onClick: () => selectPost(id),
    onClose: () => closePost(id),
  }));

  return (
    <Wrapper>
      <Tabs items={tabItems} actions={TAB_ACTIONS} />
      <Breadcrumbs />
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
