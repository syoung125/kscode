const globalColorGroupNames = ["white", "gray"] as const;
export type GlobalColorGroup = (typeof globalColorGroupNames)[number];
export function isGlobalColorGroup(str: string): str is GlobalColorGroup {
  return globalColorGroupNames.includes(str as GlobalColorGroup);
}

type MakeTokenSet<
  TGroup extends GlobalColorGroup,
  TLightness extends number[]
> = `$${TGroup}${TLightness[number]}`;
export type ColorToken =
  | "$white"
  | MakeTokenSet<"gray", [100, 200, 300, 400, 500, 600]>;

export type ColorScheme = Record<ColorToken, string>;

export type SemanticColorKey = "sideBarBg" | "mainBg";

export type SemanticColorScheme = Record<SemanticColorKey, string>;

export type ColorTheme = {
  /**
   * Raw color tokens
   */
  scheme: ColorScheme;

  /**
   * Sematic color object
   */
  semanticScheme: SemanticColorScheme;
};
