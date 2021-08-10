import {
  FilesIcon,
  SearchIcon,
  SourceControlIcon,
  RunAndDebugIcon,
  ExtensionsIcon,
} from "../../common/icons";

import { ActionItemType } from "../../common/organisms/GActivityBar";
import { ExplorerSection } from "../../side-bar/sections";

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
