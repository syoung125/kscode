import React, { MouseEventHandler } from "react";

export type IconProps = {
  style?: React.CSSProperties;
  fill?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  className?: string;
};

/**
 * Activity Bar Icons
 */
export * from "./chevron";
export { default as AccountIcon } from "./account";
export { default as CloseIcon } from "./close";
export { default as EllipsisIcon } from "./ellipsis";
export { default as ExtensionsIcon } from "./extensions";
export { default as FilesIcon } from "./files";
export { default as RunAndDebugIcon } from "./run-n-debug";
export { default as SearchIcon } from "./search";
export { default as SettingsGearIcon } from "./settings-gear";
export { default as SourceControlIcon } from "./source-control";
