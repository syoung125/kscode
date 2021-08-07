import React, { MouseEventHandler } from "react";

export type IconProps = {
  style?: React.CSSProperties;
  fill?: string;
  onClick?: MouseEventHandler<unknown>;
};

/**
 * Activity Bar Icons
 */
export { default as FilesIcon } from "./files";
export { default as SearchIcon } from "./search";
export { default as SourceControlIcon } from "./source-control";
export { default as RunAndDebugIcon } from "./run-n-debug";
export { default as ExtensionsIcon } from "./extensions";
export { default as AccountIcon } from "./account";
export { default as SettingsGearIcon } from "./settings-gear";
export { default as CloseIcon } from "./close";
export * from "./chevron";
