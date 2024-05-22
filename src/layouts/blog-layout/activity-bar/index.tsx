import { ElementType, ReactNode, KeyboardEvent, useRef } from "react";

import styled from "styled-components";

import {
  FilesIcon,
  SearchIcon,
  SourceControlIcon,
  RunAndDebugIcon,
  ExtensionsIcon,
  AccountIcon,
  SettingsGearIcon,
} from "@src/assets/icons";
import { GRAY_400 } from "@src/constants/palette";
import ThemeSwitcher from "@src/components/common/theme-switcher";

import ExplorerSection from "../explorer-section";
import LogSection from "../log-section";
import SearchSection from "../search-section";

import ActionItem from "./action-item";

const GITHUB_URL = "https://github.com/syoung125";

export const ACTIVITY_BAR_WIDTH = "3rem";

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
    content: <SearchSection />,
  },
  {
    label: "POSTING LOG",
    Icon: SourceControlIcon,
    content: <LogSection />,
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
  onKeyDown: (e: KeyboardEvent) => void;
};

export default function ActivityBar({
  currentActionItem,
  onCurrentActionItemChange,
  onKeyDown,
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

  const openGithubLink = () => {
    window.open(GITHUB_URL, "_blank");
  };

  return (
    <Wrapper onKeyDown={onKeyDown}>
      <Ul>
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
      </Ul>
      <Ul>
        <ThemeSwitcher />
        <ActionItem Icon={AccountIcon} onClick={openGithubLink} />
        <ActionItem Icon={SettingsGearIcon} onClick={() => null} />
      </Ul>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${ACTIVITY_BAR_WIDTH};

  background-color: ${GRAY_400};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  > :not(:last-child) {
    margin-bottom: 0.4rem;
  }

  > li {
    &:hover {
      cursor: pointer;
    }
  }
`;
