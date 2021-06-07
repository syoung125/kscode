import styled from "styled-components";

import {
  FilesIcon,
  SearchIcon,
  SourceControlIcon,
  RunAndDebugIcon,
  ExtensionsIcon,
  AccountIcon,
  SettingsGearIcon,
} from "@src/asset/icons";
import ActionItem from "./action-item";

export type ActionItemType = {
  label: string;
  Icon: React.ElementType;
};

export const ACTION_ITEMS: ActionItemType[] = [
  {
    label: "EXPLORER",
    Icon: FilesIcon,
  },
  {
    label: "SEARCH",
    Icon: SearchIcon,
  },
  {
    label: "SOURCE CONTROL",
    Icon: SourceControlIcon,
  },
  {
    label: "RUN AND DEBUG",
    Icon: RunAndDebugIcon,
  },
  {
    label: "EXTENSIONS",
    Icon: ExtensionsIcon,
  },
];

export type GActivityBarProps = {
  selectedActionItem: number;
  setSelectedActionItem: (selectedItem: number) => void;
};

function GActivityBar({
  selectedActionItem,
  setSelectedActionItem,
}: GActivityBarProps) {
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
  background-color: rgb(51, 51, 51);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
