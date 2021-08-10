import React from "react";
import styled from "styled-components";

import { AccountIcon, SettingsGearIcon } from "@src/components/common/icons";
import { ActionItem } from "../atoms";

import { useAppContext } from "@src/common/contexts/app";
import { ACTION_ITEMS } from "@src/components/layouts/main-layout";

export type ActionItemType = {
  label: string;
  Icon: React.ElementType;
  Content: React.ElementType;
};

function GActivityBar() {
  const {
    state: { selectedActionItem },
    action: { setSelectedActionItem },
  } = useAppContext();

  const handleActionItemClick = (index: number) => () => {
    setSelectedActionItem(index);
  };

  return (
    <Wrapper>
      <ul>
        {ACTION_ITEMS.map(({ label, Icon }, index) => (
          <ActionItem
            key={label}
            Icon={Icon}
            onClick={handleActionItemClick(index)}
            isSelected={index === selectedActionItem}
          />
        ))}
      </ul>
      <ul>
        <ActionItem Icon={AccountIcon} onClick={() => null} />
        <ActionItem Icon={SettingsGearIcon} onClick={() => null} />
      </ul>
    </Wrapper>
  );
}

export default GActivityBar;

const Wrapper = styled.nav`
  min-width: 3rem;
  background-color: ${({ theme }) => theme.colors.semanticScheme.activityBarBg};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
