import { ElementType, ReactNode, KeyboardEvent, useRef } from "react";

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
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleItemClick = (index: number) => () => {
    onCurrentActionItemChange(index === currentActionItem ? null : index);
  };

  const setFocusToPreviousItem = (index: number) => {
    const prevItemIdx =
      index === 0 ? ACTION_ITEMS.length - 1 : (index - 1) % ACTION_ITEMS.length;
    itemsRef.current[prevItemIdx]?.focus();
  };

  const setFocusToNextItem = (index: number) => {
    const nextItenIdx = (index + 1) % ACTION_ITEMS.length;
    itemsRef.current[nextItenIdx]?.focus();
  };

  const handleItemKeyDown = (index: number) => (e: KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "Enter":
        handleItemClick(index)();
        return;
      case "Up":
      case "ArrowUp":
        setFocusToPreviousItem(index);
        return;
      case "Down":
      case "ArrowDown":
        setFocusToNextItem(index);
        return;
    }
  };

  return (
    <Style.Wrapper>
      <Style.Ul>
        {ACTION_ITEMS.map(({ label, Icon }, index) => (
          <ActionItem
            ref={(el) => (itemsRef.current[index] = el)}
            key={label}
            Icon={Icon}
            isSelected={index === currentActionItem}
            onClick={handleItemClick(index)}
            onKeyDown={handleItemKeyDown(index)}
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
