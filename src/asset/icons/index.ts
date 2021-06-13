import React from "react";

export type IconProps = {
  style?: React.CSSProperties;
  fill?: string;
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
export * from "./chevron";
