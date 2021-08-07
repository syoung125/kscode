import styled, { css } from "styled-components";

import OpenPostListTabItem from "./item";
import EllipsisIcon from "@src/components/common/icons/ellipsis";
import Color from "@src/common/constants/colors";

import { useAppContext } from "@src/contexts/app";

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
            key={slug}
            slug={slug}
            isSelected={currentSlugs === slug}
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
  background-color: ${Color.OpenPostListTab.background};
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
