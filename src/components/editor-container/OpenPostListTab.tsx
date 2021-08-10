import styled, { css } from "styled-components";

import OpenPostListTabItem from "./OpenPostListTabItem";
import EllipsisIcon from "@src/components/common/icons/ellipsis";

import { useAppContext } from "@src/common/contexts/app";

type TabActionType = {
  Icon: React.ElementType;
  onClick: () => void;
};

const TAB_ACTIONS: TabActionType[] = [
  {
    Icon: EllipsisIcon,
    onClick: () => null,
  },
];

function OpenPostListTab() {
  const {
    state: { openPostSlugs, currentSlugs },
    action: { handleListItemClick, closePost },
  } = useAppContext();

  return (
    <Wrapper>
      <ListWrapper>
        {openPostSlugs.map((slug) => (
          <OpenPostListTabItem
            key={slug.id}
            id={slug.id}
            slug={slug.slug}
            isSelected={currentSlugs?.id === slug?.id}
            onClick={handleListItemClick}
            showCloseButton
            onClose={closePost}
          />
        ))}
      </ListWrapper>
      <TabActionWrapper>
        {TAB_ACTIONS.map(({ Icon, onClick }, index) => (
          <TabActionItem onClick={onClick} key={index}>
            <Icon style={{ width: "1.6rem", height: "1.6rem" }} />
          </TabActionItem>
        ))}
      </TabActionWrapper>
    </Wrapper>
  );
}

export default OpenPostListTab;

const Row = css`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  ${Row}
  height: 2.4rem;
  background-color: ${({ theme }) => theme.colors.scheme.$gray400};
`;

const ListWrapper = styled.ul`
  ${Row}
  overflow-y: auto
`;

const TabActionWrapper = styled.div`
  ${Row}
  align-items: center;
  margin-left: auto;
  padding: 0 0.8rem;
`;

const TabActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
`;
