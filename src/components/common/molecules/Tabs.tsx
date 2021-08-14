import styled, { css } from "styled-components";

import { TabItem, TabItemProps } from "../atoms";

export type TabItemType = TabItemProps;
export type TabsActionType = {
  Icon: React.ElementType;
  onClick: () => void;
};

export type TabsProps = {
  items: TabItemType[];
  actions: TabsActionType[];
};

function Tabs({ items, actions }: TabsProps) {
  return (
    <Wrapper>
      <ListWrapper>
        {items.map((item) => (
          <TabItem key={item.title} {...item} />
        ))}
      </ListWrapper>
      <TabActionWrapper>
        {actions.map(({ Icon, onClick }, index) => (
          <TabActionItem key={index} onClick={onClick}>
            <Icon style={{ width: "1.6rem", height: "1.6rem" }} />
          </TabActionItem>
        ))}
      </TabActionWrapper>
    </Wrapper>
  );
}

export default Tabs;

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
