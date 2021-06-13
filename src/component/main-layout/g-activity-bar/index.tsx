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

import { ExplorerSection } from "../g-side-bar/sections";

import { useAppContext } from "@src/contexts/app";

export type ActionItemType = {
  label: string;
  Icon: React.ElementType;
  Content: React.ElementType;
};

export const ACTION_ITEMS: ActionItemType[] = [
  {
    label: "EXPLORER",
    Icon: FilesIcon,
    Content: ExplorerSection,
  },
  {
    label: "SEARCH",
    Icon: SearchIcon,
    Content: () => <>SEARCH</>,
  },
  {
    label: "SOURCE CONTROL",
    Icon: SourceControlIcon,
    Content: () => <>SOURCE CONTROL</>,
  },
  {
    label: "RUN AND DEBUG",
    Icon: RunAndDebugIcon,
    Content: () => <>RUN AND DEBUG</>,
  },
  {
    label: "EXTENSIONS",
    Icon: ExtensionsIcon,
    Content: () => <>EXTENSIONS</>,
  },
];

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
  background-color: rgb(51, 51, 51);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
