import styled from "styled-components";

import { AccountIcon, SettingsGearIcon } from "@src/components/common/icons";
import { ActionItem } from "../atoms";

import { ACTION_ITEMS } from "@src/components/layouts/main-layout";

export type GActivityBarProps = {
  currentActionItem: number | null;
  // eslint-disable-next-line no-unused-vars
  onItemClick: (_index: number) => () => void;
};

function GActivityBar({
  currentActionItem = 0,
  onItemClick,
}: GActivityBarProps) {
  return (
    <Wrapper>
      <ul>
        {ACTION_ITEMS.map(({ label, Icon }, index) => (
          <ActionItem
            key={label}
            Icon={Icon}
            onClick={onItemClick(index)}
            isSelected={index === currentActionItem}
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
