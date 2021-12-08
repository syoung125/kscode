import React, { ElementType, ReactNode } from "react";

import {
  FilesIcon,
  SearchIcon,
  SourceControlIcon,
  RunAndDebugIcon,
  ExtensionsIcon,
} from "@src/components/common/icons";

import { ExplorerSection } from "@src/components/side-bar/sections";

export type ActionItemType = {
  label: string;
  Icon: ElementType;
  Content?: ReactNode;
  href?: string;
};

export const ACTION_ITEMS: ActionItemType[] = [
  {
    label: "EXPLORER",
    Icon: FilesIcon,
    Content: <ExplorerSection />,
  },
  {
    label: "SEARCH",
    Icon: SearchIcon,
    Content: "SEARCH",
  },
  {
    label: "SOURCE CONTROL",
    Icon: SourceControlIcon,
    Content: "SOURCE CONTROL",
  },
  {
    label: "RUN AND DEBUG",
    Icon: RunAndDebugIcon,
    Content: "RUN AND DEBUG",
  },
  {
    label: "EXTENSIONS",
    Icon: ExtensionsIcon,
    Content: "EXTENSIONS",
  },
];
