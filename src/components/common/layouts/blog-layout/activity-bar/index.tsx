import { ElementType, ReactNode } from "react";

import {
  FilesIcon,
  SearchIcon,
  SourceControlIcon,
  RunAndDebugIcon,
  ExtensionsIcon,
  AccountIcon,
  SettingsGearIcon,
} from "@src/components/common/icons";
import { ThemeSwitcher } from "@src/components/common/molecules";

import ExplorerSection from "../explorer-section";

import ActionItem from "./action-item";

import Style from "./index.style";

export type ActionItemType = {
  label: string;
  Icon: ElementType;
  content?: ReactNode;
  href?: string;
};

export const ACTION_ITEMS: ActionItemType[] = [
  {
    label: "EXPLORER",
    Icon: FilesIcon,
    content: <ExplorerSection />,
  },
  {
    label: "SEARCH",
    Icon: SearchIcon,
    content: "SEARCH",
  },
  {
    label: "SOURCE CONTROL",
    Icon: SourceControlIcon,
    content: "SOURCE CONTROL",
  },
  {
    label: "RUN AND DEBUG",
    Icon: RunAndDebugIcon,
    content: "RUN AND DEBUG",
  },
  {
    label: "EXTENSIONS",
    Icon: ExtensionsIcon,
    content: "EXTENSIONS",
  },
];

type ActivityBarProps = {
  currentActionItem: number | null;
  onCurrentActionItemChange: (index: number | null) => void;
};

export default function ActivityBar({
  currentActionItem,
  onCurrentActionItemChange,
}: ActivityBarProps) {
  const handleActionItemClick = (index: number) => () => {
    onCurrentActionItemChange(index === currentActionItem ? null : index);
  };

  return (
    <Style.Wrapper>
      <Style.Ul>
        {ACTION_ITEMS.map(({ label, Icon }, index) => (
          <ActionItem
            key={label}
            Icon={Icon}
            onClick={handleActionItemClick(index)}
            isSelected={index === currentActionItem}
          />
        ))}
      </Style.Ul>
      <Style.Ul>
        <ThemeSwitcher />
        <ActionItem Icon={AccountIcon} onClick={() => null} />
        <ActionItem Icon={SettingsGearIcon} onClick={() => null} />
      </Style.Ul>
    </Style.Wrapper>
  );
}
