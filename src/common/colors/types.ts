const globalColorGroupNames = ["white", "gray", "blue"] as const;
export type GlobalColorGroup = typeof globalColorGroupNames[number];
export function isGlobalColorGroup(str: string): str is GlobalColorGroup {
  return globalColorGroupNames.includes(str as GlobalColorGroup);
}

type MakeTokenSet<
  TGroup extends GlobalColorGroup,
  TLightness extends number[]
> = `$${TGroup}${TLightness[number]}`;
export type ColorToken =
  | "$white"
  | MakeTokenSet<"gray", [100, 200, 300, 400, 500]>
  | "$blue";

export type ColorScheme = Record<ColorToken, string>;

export type SemanticColorScheme = {
  headerBg: ColorToken | string;
  activityBarBg: ColorToken | string;
  sideBarBg: ColorToken | string;
  mainBg: ColorToken | string;
  footerBg: ColorToken | string;
};

export type SemanticColorKey = keyof SemanticColorScheme;

export type ColorTheme = {
  /**
   * Raw color tokens
   */
  scheme: ColorScheme;

  /**
   * Sematic color object (isn't eagerly populated)
   */
  semanticScheme: SemanticColorScheme;
};
