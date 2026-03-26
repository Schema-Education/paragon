// Paragon Design Token Data — extracted from tokens/src/ and styles/css/

export interface ColorToken {
  name: string;
  value: string;
  cssVar: string;
  description?: string;
}

export interface ColorScale {
  name: string;
  base: string;
  baseHex: string;
  steps: ColorToken[];
}

export interface SpacingToken {
  name: string;
  value: string;
  cssVar: string;
  multiplier: string;
  description: string;
}

export interface RadiusToken {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}

export interface TypographyToken {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}

export interface BreakpointToken {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}

export interface ElevationToken {
  name: string;
  level: number | string;
  shadow: string;
  description: string;
}

export interface ZIndexToken {
  name: string;
  value: number;
  description: string;
}

export interface TransitionToken {
  name: string;
  property: string;
  duration: string;
  timingFunction: string;
  cssVar: string;
  description: string;
}

export interface LineHeightToken {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}

export interface BorderWidthToken {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}

export interface MiscToken {
  name: string;
  value: string;
  cssVar?: string;
  description: string;
}

export interface DirectionalShadowGroup {
  direction: string;
  description: string;
  levels: { level: number; shadow: string }[];
}

export interface SemanticColorGroup {
  category: string;
  tokens: { role: string; resolvedColor: string; referencePath: string }[];
}

// ─── Primitive Colors ────────────────────────────────────────────
export const primitiveColors: ColorToken[] = [
  { name: "white", value: "#FFFFFF", cssVar: "--pgn-color-white" },
  { name: "black", value: "#000000", cssVar: "--pgn-color-black" },
  { name: "blue", value: "#23419F", cssVar: "--pgn-color-blue" },
  { name: "red", value: "#C32D3A", cssVar: "--pgn-color-red" },
  { name: "green", value: "#178253", cssVar: "--pgn-color-green" },
  { name: "yellow", value: "#FFD900", cssVar: "--pgn-color-yellow" },
  { name: "teal", value: "#006DAA", cssVar: "--pgn-color-teal" },
  { name: "accent-a", value: "#00BBF9", cssVar: "--pgn-color-accent-a" },
  { name: "accent-b", value: "#FFEE88", cssVar: "--pgn-color-accent-b" },
];

// ─── Color Scales ────────────────────────────────────────────────
export const colorScales: ColorScale[] = [
  {
    name: "primary",
    base: "primary-base",
    baseHex: "#0A3055",
    steps: [
      { name: "100", value: "#F0F3F5", cssVar: "--pgn-color-primary-100" },
      { name: "200", value: "#C2CBD5", cssVar: "--pgn-color-primary-200" },
      { name: "300", value: "#8598AA", cssVar: "--pgn-color-primary-300" },
      { name: "400", value: "#476480", cssVar: "--pgn-color-primary-400" },
      { name: "500 (base)", value: "#0A3055", cssVar: "--pgn-color-primary-500" },
      { name: "600", value: "#092B4D", cssVar: "--pgn-color-primary-600" },
      { name: "700", value: "#082644", cssVar: "--pgn-color-primary-700" },
      { name: "800", value: "#082440", cssVar: "--pgn-color-primary-800" },
      { name: "900", value: "#07223C", cssVar: "--pgn-color-primary-900" },
    ],
  },
  {
    name: "secondary",
    base: "gray-700",
    baseHex: "#454545",
    steps: [
      { name: "100", value: "#F4F4F4", cssVar: "--pgn-color-secondary-100" },
      { name: "200", value: "#D1D1D1", cssVar: "--pgn-color-secondary-200" },
      { name: "300", value: "#A2A2A2", cssVar: "--pgn-color-secondary-300" },
      { name: "400", value: "#747474", cssVar: "--pgn-color-secondary-400" },
      { name: "500 (base)", value: "#454545", cssVar: "--pgn-color-secondary-500" },
      { name: "600", value: "#3E3E3E", cssVar: "--pgn-color-secondary-600" },
      { name: "700", value: "#373737", cssVar: "--pgn-color-secondary-700" },
      { name: "800", value: "#343434", cssVar: "--pgn-color-secondary-800" },
      { name: "900", value: "#303030", cssVar: "--pgn-color-secondary-900" },
    ],
  },
  {
    name: "brand",
    base: "brand-base",
    baseHex: "#9D0054",
    steps: [
      { name: "100", value: "#F9F0F5", cssVar: "--pgn-color-brand-100" },
      { name: "200", value: "#E7BFD4", cssVar: "--pgn-color-brand-200" },
      { name: "300", value: "#CE80AA", cssVar: "--pgn-color-brand-300" },
      { name: "400", value: "#B6407F", cssVar: "--pgn-color-brand-400" },
      { name: "500 (base)", value: "#9D0054", cssVar: "--pgn-color-brand-500" },
      { name: "600", value: "#8D004C", cssVar: "--pgn-color-brand-600" },
      { name: "700", value: "#7E0043", cssVar: "--pgn-color-brand-700" },
      { name: "800", value: "#76003F", cssVar: "--pgn-color-brand-800" },
      { name: "900", value: "#6E003B", cssVar: "--pgn-color-brand-900" },
    ],
  },
  {
    name: "success",
    base: "green",
    baseHex: "#178253",
    steps: [
      { name: "100", value: "#F1F8F5", cssVar: "--pgn-color-success-100" },
      { name: "200", value: "#C5E0D4", cssVar: "--pgn-color-success-200" },
      { name: "300", value: "#8BC1A9", cssVar: "--pgn-color-success-300" },
      { name: "400", value: "#51A17E", cssVar: "--pgn-color-success-400" },
      { name: "500 (base)", value: "#178253", cssVar: "--pgn-color-success-500" },
      { name: "600", value: "#15754B", cssVar: "--pgn-color-success-600" },
      { name: "700", value: "#126842", cssVar: "--pgn-color-success-700" },
      { name: "800", value: "#11623E", cssVar: "--pgn-color-success-800" },
      { name: "900", value: "#105B3A", cssVar: "--pgn-color-success-900" },
    ],
  },
  {
    name: "info",
    base: "teal",
    baseHex: "#006DAA",
    steps: [
      { name: "100", value: "#F0F6FA", cssVar: "--pgn-color-info-100" },
      { name: "200", value: "#BFDBEA", cssVar: "--pgn-color-info-200" },
      { name: "300", value: "#80B6D5", cssVar: "--pgn-color-info-300" },
      { name: "400", value: "#4092BF", cssVar: "--pgn-color-info-400" },
      { name: "500 (base)", value: "#006DAA", cssVar: "--pgn-color-info-500" },
      { name: "600", value: "#006299", cssVar: "--pgn-color-info-600" },
      { name: "700", value: "#005788", cssVar: "--pgn-color-info-700" },
      { name: "800", value: "#005280", cssVar: "--pgn-color-info-800" },
      { name: "900", value: "#004C77", cssVar: "--pgn-color-info-900" },
    ],
  },
  {
    name: "warning",
    base: "yellow",
    baseHex: "#FFD900",
    steps: [
      { name: "100", value: "#FFFDF0", cssVar: "--pgn-color-warning-100" },
      { name: "200", value: "#FFF6BF", cssVar: "--pgn-color-warning-200" },
      { name: "300", value: "#FFEC80", cssVar: "--pgn-color-warning-300" },
      { name: "400", value: "#FFE340", cssVar: "--pgn-color-warning-400" },
      { name: "500 (base)", value: "#FFD900", cssVar: "--pgn-color-warning-500" },
      { name: "600", value: "#E6C300", cssVar: "--pgn-color-warning-600" },
      { name: "700", value: "#CCAE00", cssVar: "--pgn-color-warning-700" },
      { name: "800", value: "#BFA300", cssVar: "--pgn-color-warning-800" },
      { name: "900", value: "#B39800", cssVar: "--pgn-color-warning-900" },
    ],
  },
  {
    name: "danger",
    base: "red",
    baseHex: "#C32D3A",
    steps: [
      { name: "100", value: "#FBF2F3", cssVar: "--pgn-color-danger-100" },
      { name: "200", value: "#F0CBCE", cssVar: "--pgn-color-danger-200" },
      { name: "300", value: "#E1969D", cssVar: "--pgn-color-danger-300" },
      { name: "400", value: "#D2626B", cssVar: "--pgn-color-danger-400" },
      { name: "500 (base)", value: "#C32D3A", cssVar: "--pgn-color-danger-500" },
      { name: "600", value: "#B02934", cssVar: "--pgn-color-danger-600" },
      { name: "700", value: "#9C242E", cssVar: "--pgn-color-danger-700" },
      { name: "800", value: "#92222C", cssVar: "--pgn-color-danger-800" },
      { name: "900", value: "#892029", cssVar: "--pgn-color-danger-900" },
    ],
  },
  {
    name: "gray",
    base: "gray-base",
    baseHex: "#707070",
    steps: [
      { name: "100", value: "#EBEBEB", cssVar: "--pgn-color-gray-100" },
      { name: "200", value: "#CCCCCC", cssVar: "--pgn-color-gray-200" },
      { name: "300", value: "#ADADAD", cssVar: "--pgn-color-gray-300" },
      { name: "400", value: "#8F8F8F", cssVar: "--pgn-color-gray-400" },
      { name: "500 (base)", value: "#707070", cssVar: "--pgn-color-gray-500" },
      { name: "600", value: "#5C5C5C", cssVar: "--pgn-color-gray-600" },
      { name: "700", value: "#454545", cssVar: "--pgn-color-gray-700" },
      { name: "800", value: "#333333", cssVar: "--pgn-color-gray-800" },
      { name: "900", value: "#212529", cssVar: "--pgn-color-gray-900" },
    ],
  },
  {
    name: "light",
    base: "light-base",
    baseHex: "#E1DDDB",
    steps: [
      { name: "100", value: "#FDFDFD", cssVar: "--pgn-color-light-100" },
      { name: "200", value: "#F8F7F6", cssVar: "--pgn-color-light-200" },
      { name: "300", value: "#F0EEED", cssVar: "--pgn-color-light-300" },
      { name: "400", value: "#E9E6E4", cssVar: "--pgn-color-light-400" },
      { name: "500 (base)", value: "#E1DDDB", cssVar: "--pgn-color-light-500" },
      { name: "600", value: "#CBC7C5", cssVar: "--pgn-color-light-600" },
      { name: "700", value: "#B4B1AF", cssVar: "--pgn-color-light-700" },
      { name: "800", value: "#A9A6A4", cssVar: "--pgn-color-light-800" },
      { name: "900", value: "#9E9B99", cssVar: "--pgn-color-light-900" },
    ],
  },
  {
    name: "dark",
    base: "dark-base",
    baseHex: "#273F2F",
    steps: [
      { name: "100", value: "#F2F3F3", cssVar: "--pgn-color-dark-100" },
      { name: "200", value: "#C9CFCB", cssVar: "--pgn-color-dark-200" },
      { name: "300", value: "#939F97", cssVar: "--pgn-color-dark-300" },
      { name: "400", value: "#5D6F63", cssVar: "--pgn-color-dark-400" },
      { name: "500 (base)", value: "#273F2F", cssVar: "--pgn-color-dark-500" },
      { name: "600", value: "#23392A", cssVar: "--pgn-color-dark-600" },
      { name: "700", value: "#1F3226", cssVar: "--pgn-color-dark-700" },
      { name: "800", value: "#1D2F23", cssVar: "--pgn-color-dark-800" },
      { name: "900", value: "#1B2C21", cssVar: "--pgn-color-dark-900" },
    ],
  },
];

// ─── Semantic Color Aliases ──────────────────────────────────────
export const semanticColors: SemanticColorGroup[] = [
  {
    category: "Background",
    tokens: [
      { role: "bg-base", resolvedColor: "#FFFFFF", referencePath: "color.white" },
      { role: "bg-active", resolvedColor: "#0A3055", referencePath: "color.primary.500" },
    ],
  },
  {
    category: "Theme Background",
    tokens: [
      { role: "theme-bg-primary", resolvedColor: "#F0F3F5", referencePath: "color.primary.100" },
      { role: "theme-bg-secondary", resolvedColor: "#F4F4F4", referencePath: "color.secondary.100" },
      { role: "theme-bg-brand", resolvedColor: "#F9F0F5", referencePath: "color.brand.100" },
      { role: "theme-bg-success", resolvedColor: "#F1F8F5", referencePath: "color.success.100" },
      { role: "theme-bg-info", resolvedColor: "#F0F6FA", referencePath: "color.info.100" },
      { role: "theme-bg-warning", resolvedColor: "#FFFDF0", referencePath: "color.warning.100" },
      { role: "theme-bg-danger", resolvedColor: "#FBF2F3", referencePath: "color.danger.100" },
      { role: "theme-bg-light", resolvedColor: "#FDFDFD", referencePath: "color.light.100" },
      { role: "theme-bg-dark", resolvedColor: "#F2F3F3", referencePath: "color.dark.100" },
      { role: "theme-bg-gray", resolvedColor: "#EBEBEB", referencePath: "color.gray.100" },
    ],
  },
  {
    category: "Theme Border",
    tokens: [
      { role: "border", resolvedColor: "#CCCCCC", referencePath: "color.gray.200" },
      { role: "theme-border-primary", resolvedColor: "#C2CBD5", referencePath: "color.primary.200" },
      { role: "theme-border-secondary", resolvedColor: "#D1D1D1", referencePath: "color.secondary.200" },
      { role: "theme-border-brand", resolvedColor: "#E7BFD4", referencePath: "color.brand.200" },
      { role: "theme-border-success", resolvedColor: "#C5E0D4", referencePath: "color.success.200" },
      { role: "theme-border-info", resolvedColor: "#BFDBEA", referencePath: "color.info.200" },
      { role: "theme-border-warning", resolvedColor: "#FFF6BF", referencePath: "color.warning.200" },
      { role: "theme-border-danger", resolvedColor: "#F0CBCE", referencePath: "color.danger.200" },
      { role: "theme-border-light", resolvedColor: "#F8F7F6", referencePath: "color.light.200" },
      { role: "theme-border-dark", resolvedColor: "#C9CFCB", referencePath: "color.dark.200" },
      { role: "theme-border-gray", resolvedColor: "#CCCCCC", referencePath: "color.gray.200" },
    ],
  },
  {
    category: "Theme Focus",
    tokens: [
      { role: "theme-focus-primary", resolvedColor: "#0A3055", referencePath: "color.primary.500" },
      { role: "theme-focus-brand", resolvedColor: "#9D0054", referencePath: "color.brand.500" },
      { role: "theme-focus-success", resolvedColor: "#178253", referencePath: "color.success.500" },
      { role: "theme-focus-danger", resolvedColor: "#C32D3A", referencePath: "color.danger.500" },
      { role: "theme-focus-secondary", resolvedColor: "#454545", referencePath: "color.secondary.500" },
      { role: "theme-focus-info", resolvedColor: "#006DAA", referencePath: "color.info.500" },
      { role: "theme-focus-warning", resolvedColor: "#FFD900", referencePath: "color.warning.500" },
      { role: "theme-focus-light", resolvedColor: "#E1DDDB", referencePath: "color.light.500" },
      { role: "theme-focus-dark", resolvedColor: "#273F2F", referencePath: "color.dark.500" },
      { role: "theme-focus-gray", resolvedColor: "#707070", referencePath: "color.gray.500" },
    ],
  },
  {
    category: "State Colors",
    tokens: [
      { role: "active", resolvedColor: "#FFFFFF", referencePath: "color.white" },
      { role: "disabled", resolvedColor: "#707070", referencePath: "color.gray.500" },
      { role: "input-focus", resolvedColor: "#0A3055", referencePath: "color.primary.500" },
    ],
  },
  {
    category: "Theme Default",
    tokens: [
      { role: "theme-default-primary", resolvedColor: "#0A3055", referencePath: "color.primary.500" },
      { role: "theme-default-secondary", resolvedColor: "#454545", referencePath: "color.secondary.500" },
      { role: "theme-default-brand", resolvedColor: "#9D0054", referencePath: "color.brand.500" },
      { role: "theme-default-success", resolvedColor: "#178253", referencePath: "color.success.500" },
      { role: "theme-default-info", resolvedColor: "#006DAA", referencePath: "color.info.500" },
      { role: "theme-default-warning", resolvedColor: "#FFD900", referencePath: "color.warning.500" },
      { role: "theme-default-danger", resolvedColor: "#C32D3A", referencePath: "color.danger.500" },
      { role: "theme-default-light", resolvedColor: "#E1DDDB", referencePath: "color.light.500" },
      { role: "theme-default-dark", resolvedColor: "#273F2F", referencePath: "color.dark.500" },
      { role: "theme-default-gray", resolvedColor: "#707070", referencePath: "color.gray.500" },
    ],
  },
  {
    category: "Theme Hover",
    tokens: [
      { role: "theme-hover-primary", resolvedColor: "#082644", referencePath: "color.primary.700" },
      { role: "theme-hover-secondary", resolvedColor: "#373737", referencePath: "color.secondary.700" },
      { role: "theme-hover-brand", resolvedColor: "#7E0043", referencePath: "color.brand.700" },
      { role: "theme-hover-success", resolvedColor: "#126842", referencePath: "color.success.700" },
      { role: "theme-hover-info", resolvedColor: "#005788", referencePath: "color.info.700" },
      { role: "theme-hover-warning", resolvedColor: "#CCAE00", referencePath: "color.warning.700" },
      { role: "theme-hover-danger", resolvedColor: "#9C242E", referencePath: "color.danger.700" },
      { role: "theme-hover-light", resolvedColor: "#B4B1AF", referencePath: "color.light.700" },
      { role: "theme-hover-dark", resolvedColor: "#1F3226", referencePath: "color.dark.700" },
      { role: "theme-hover-gray", resolvedColor: "#454545", referencePath: "color.gray.700" },
    ],
  },
  {
    category: "Theme Active",
    tokens: [
      { role: "theme-active-primary", resolvedColor: "#07223C", referencePath: "color.primary.900" },
      { role: "theme-active-secondary", resolvedColor: "#303030", referencePath: "color.secondary.900" },
      { role: "theme-active-brand", resolvedColor: "#6E003B", referencePath: "color.brand.900" },
      { role: "theme-active-success", resolvedColor: "#105B3A", referencePath: "color.success.900" },
      { role: "theme-active-info", resolvedColor: "#004C77", referencePath: "color.info.900" },
      { role: "theme-active-warning", resolvedColor: "#B39800", referencePath: "color.warning.900" },
      { role: "theme-active-danger", resolvedColor: "#892029", referencePath: "color.danger.900" },
      { role: "theme-active-light", resolvedColor: "#9E9B99", referencePath: "color.light.900" },
      { role: "theme-active-dark", resolvedColor: "#1B2C21", referencePath: "color.dark.900" },
      { role: "theme-active-gray", resolvedColor: "#212529", referencePath: "color.gray.900" },
    ],
  },
  {
    category: "Text Colors",
    tokens: [
      { role: "text-50-black", resolvedColor: "rgba(0,0,0,0.5)", referencePath: "color.black @ 50% alpha" },
      { role: "text-50-white", resolvedColor: "rgba(255,255,255,0.5)", referencePath: "color.white @ 50% alpha" },
      { role: "yiq-text-dark", resolvedColor: "#454545", referencePath: "yiq-text-dark" },
      { role: "yiq-text-light", resolvedColor: "#FFFFFF", referencePath: "yiq-text-light" },
    ],
  },
  {
    category: "Table Colors",
    tokens: [
      { role: "table-caption", resolvedColor: "#707070", referencePath: "color.text-muted → color.gray.500" },
      { role: "table-border", resolvedColor: "#CCCCCC", referencePath: "color.border → color.gray.200" },
    ],
  },
];

// ─── Spacing ─────────────────────────────────────────────────────
export const spacingTokens: SpacingToken[] = [
  { name: "0", value: "0", cssVar: "--pgn-spacing-spacer-0", multiplier: "0", description: "Level 0" },
  { name: "1", value: "0.25rem", cssVar: "--pgn-spacing-spacer-1", multiplier: "0.25x", description: "Level 1" },
  { name: "1.5", value: "0.375rem", cssVar: "--pgn-spacing-spacer-1-5", multiplier: "0.375x", description: "Level 1.5" },
  { name: "2", value: "0.5rem", cssVar: "--pgn-spacing-spacer-2", multiplier: "0.5x", description: "Level 2" },
  { name: "2.5", value: "0.75rem", cssVar: "--pgn-spacing-spacer-2-5", multiplier: "0.75x", description: "Level 2.5" },
  { name: "3 (base)", value: "1rem", cssVar: "--pgn-spacing-spacer-3", multiplier: "1x", description: "Level 3 — base" },
  { name: "3.5", value: "1.25rem", cssVar: "--pgn-spacing-spacer-3-5", multiplier: "1.25x", description: "Level 3.5" },
  { name: "4", value: "1.5rem", cssVar: "--pgn-spacing-spacer-4", multiplier: "1.5x", description: "Level 4" },
  { name: "4.5", value: "2rem", cssVar: "--pgn-spacing-spacer-4-5", multiplier: "2x", description: "Level 4.5" },
  { name: "5", value: "3rem", cssVar: "--pgn-spacing-spacer-5", multiplier: "3x", description: "Level 5" },
  { name: "5.5", value: "4rem", cssVar: "--pgn-spacing-spacer-5-5", multiplier: "4x", description: "Level 5.5" },
  { name: "6", value: "5rem", cssVar: "--pgn-spacing-spacer-6", multiplier: "5x", description: "Level 6" },
];

// ─── Border Radius ───────────────────────────────────────────────
export const radiusTokens: RadiusToken[] = [
  { name: "sm", value: "0.25rem", cssVar: "--pgn-size-border-radius-sm", description: "Small border radius" },
  { name: "base", value: "0.375rem", cssVar: "--pgn-size-border-radius-base", description: "Default border radius" },
  { name: "lg", value: "0.425rem", cssVar: "--pgn-size-border-radius-lg", description: "Large border radius" },
  { name: "pill", value: "50rem", cssVar: "--pgn-size-rounded-pill", description: "Pill border radius" },
];

// ─── Typography ──────────────────────────────────────────────────
export const typographyFamilies = [
  { name: "sans-serif (base)", value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'", cssVar: "--pgn-typography-font-family-base" },
  { name: "serif", value: "serif", cssVar: "--pgn-typography-font-family-serif" },
  { name: "monospace", value: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", cssVar: "--pgn-typography-font-family-monospace" },
];

export const typographySizes: TypographyToken[] = [
  { name: "micro", value: "0.688rem", cssVar: "--pgn-typography-font-size-micro", description: "Micro" },
  { name: "xs", value: "75%", cssVar: "--pgn-typography-font-size-xs", description: "X-Small" },
  { name: "sm", value: "87.5%", cssVar: "--pgn-typography-font-size-sm", description: "Small" },
  { name: "base", value: "1.125rem", cssVar: "--pgn-typography-font-size-base", description: "Base (18px)" },
  { name: "lg", value: "1.40625rem", cssVar: "--pgn-typography-font-size-lg", description: "Large (base * 1.25)" },
  { name: "h6", value: "0.75rem", cssVar: "--pgn-typography-font-size-h6", description: "Heading 6" },
  { name: "h5", value: "0.875rem", cssVar: "--pgn-typography-font-size-h5", description: "Heading 5" },
  { name: "h4", value: "1.125rem", cssVar: "--pgn-typography-font-size-h4", description: "Heading 4" },
  { name: "h3", value: "1.375rem", cssVar: "--pgn-typography-font-size-h3", description: "Heading 3" },
  { name: "h2", value: "2rem", cssVar: "--pgn-typography-font-size-h2", description: "Heading 2" },
  { name: "h1", value: "2.5rem", cssVar: "--pgn-typography-font-size-h1", description: "Heading 1" },
  { name: "display-1", value: "3.75rem", cssVar: "--pgn-typography-font-size-display-1", description: "Display 1" },
  { name: "display-2", value: "4.875rem", cssVar: "--pgn-typography-font-size-display-2", description: "Display 2" },
  { name: "display-3", value: "5.625rem", cssVar: "--pgn-typography-font-size-display-3", description: "Display 3" },
  { name: "display-4", value: "7.5rem", cssVar: "--pgn-typography-font-size-display-4", description: "Display 4" },
];

export const typographyWeights = [
  { name: "lighter", value: "lighter", cssVar: "--pgn-typography-font-weight-lighter" },
  { name: "light", value: "300", cssVar: "--pgn-typography-font-weight-light" },
  { name: "normal", value: "400", cssVar: "--pgn-typography-font-weight-normal" },
  { name: "semi-bold", value: "500", cssVar: "--pgn-typography-font-weight-semi-bold" },
  { name: "bold", value: "700", cssVar: "--pgn-typography-font-weight-bold" },
  { name: "bolder", value: "bolder", cssVar: "--pgn-typography-font-weight-bolder" },
];

// ─── Breakpoints ─────────────────────────────────────────────────
export const breakpoints: BreakpointToken[] = [
  { name: "xs", value: "0px", cssVar: "--pgn-size-breakpoint-xs", description: "Portrait phones" },
  { name: "sm", value: "576px", cssVar: "--pgn-size-breakpoint-sm", description: "Landscape phones" },
  { name: "md", value: "768px", cssVar: "--pgn-size-breakpoint-md", description: "Tablets" },
  { name: "lg", value: "992px", cssVar: "--pgn-size-breakpoint-lg", description: "Desktops" },
  { name: "xl", value: "1200px", cssVar: "--pgn-size-breakpoint-xl", description: "Large desktops" },
  { name: "xxl", value: "1400px", cssVar: "--pgn-size-breakpoint-xxl", description: "Extra large desktops" },
];

// ─── Elevation (Box Shadows) ─────────────────────────────────────
export const elevationLevels: ElevationToken[] = [
  {
    name: "Level 1",
    level: 1,
    shadow: "0 0.0625rem 0.125rem rgba(0,0,0,0.15), 0 0.0625rem 0.25rem rgba(0,0,0,0.15)",
    description: "Subtle elevation for cards, data tables",
  },
  {
    name: "Level 2",
    level: 2,
    shadow: "0 0.125rem 0.25rem rgba(0,0,0,0.15), 0 0.125rem 0.5rem rgba(0,0,0,0.15)",
    description: "Medium elevation for floating elements",
  },
  {
    name: "Level 3",
    level: 3,
    shadow: "0 0 0.625rem rgba(0,0,0,0.15), 0 0 1rem rgba(0,0,0,0.15)",
    description: "Higher elevation for overlays",
  },
  {
    name: "Level 4",
    level: 4,
    shadow: "0 0.625rem 1.25rem rgba(0,0,0,0.15), 0 0.5rem 1.25rem rgba(0,0,0,0.15)",
    description: "High elevation for modals",
  },
  {
    name: "Level 5",
    level: 5,
    shadow: "0 1.25rem 2.5rem rgba(0,0,0,0.15), 0 0.5rem 3rem rgba(0,0,0,0.15)",
    description: "Highest elevation for toasts, notifications",
  },
  {
    name: "Small",
    level: "sm",
    shadow: "0 0.0625rem 0.125rem rgba(0,0,0,0.2)",
    description: "Compact shadow",
  },
  {
    name: "Base",
    level: "base",
    shadow: "0 0.125rem 0.25rem rgba(0,0,0,0.3)",
    description: "Default shadow",
  },
  {
    name: "Large",
    level: "lg",
    shadow: "0 0.25rem 0.5rem rgba(0,0,0,0.3)",
    description: "Large shadow",
  },
];

// ─── Z-Index ─────────────────────────────────────────────────────
export const zIndexTokens: ZIndexToken[] = [
  { name: "0", value: 0, description: "Base level" },
  { name: "200", value: 200, description: "Level 200" },
  { name: "400", value: 400, description: "Level 400" },
  { name: "600", value: 600, description: "Level 600" },
  { name: "800", value: 800, description: "Level 800" },
  { name: "1000", value: 1000, description: "Level 1000" },
  { name: "sticky", value: 1020, description: "Sticky elements" },
  { name: "fixed", value: 1030, description: "Fixed elements" },
  { name: "1200", value: 1200, description: "Level 1200" },
  { name: "1400", value: 1400, description: "Level 1400" },
  { name: "1600", value: 1600, description: "Level 1600" },
  { name: "1800", value: 1800, description: "Level 1800" },
  { name: "2000", value: 2000, description: "Level 2000" },
];

// ─── Transitions ────────────────────────────────────────────────
export const transitionTokens: TransitionToken[] = [
  { name: "base", property: "all", duration: "0.2s", timingFunction: "ease-in-out", cssVar: "--pgn-transition-base", description: "Generic transition for any property change" },
  { name: "fade", property: "opacity", duration: "0.15s", timingFunction: "linear", cssVar: "--pgn-transition-fade", description: "Opacity transition (150ms)" },
  { name: "collapse-height", property: "height", duration: "0.35s", timingFunction: "ease", cssVar: "--pgn-transition-collapse", description: "Collapse transition for height (350ms)" },
  { name: "collapse-width", property: "width", duration: "0.35s", timingFunction: "ease", cssVar: "--pgn-transition-collapse-width", description: "Collapse transition for width (350ms)" },
];

// ─── Line Heights ───────────────────────────────────────────────
export const lineHeightTokens: LineHeightToken[] = [
  { name: "base", value: "1.5556", cssVar: "--pgn-typography-line-height-base", description: "Base line height" },
  { name: "lg", value: "1.5", cssVar: "--pgn-typography-line-height-lg", description: "Large line height" },
  { name: "sm", value: "1.5", cssVar: "--pgn-typography-line-height-sm", description: "Small line height" },
  { name: "micro", value: "0.938rem", cssVar: "--pgn-typography-line-height-micro", description: "Micro line height" },
  { name: "display-base", value: "1", cssVar: "--pgn-typography-line-height-display-base", description: "Standard display line height" },
  { name: "display-mobile", value: "3.5rem", cssVar: "--pgn-typography-line-height-display-mobile", description: "Mobile display line height" },
];

// ─── Mobile Font Sizes ──────────────────────────────────────────
export const mobileFontSizes: TypographyToken[] = [
  { name: "h1-mobile", value: "2.25rem", cssVar: "--pgn-typography-font-size-h1-mobile", description: "Heading 1 (mobile)" },
  { name: "h2-mobile", value: "2rem", cssVar: "--pgn-typography-font-size-h2-mobile", description: "Heading 2 (mobile, same as desktop)" },
  { name: "h3-mobile", value: "1.375rem", cssVar: "--pgn-typography-font-size-h3-mobile", description: "Heading 3 (mobile, same as desktop)" },
  { name: "h4-mobile", value: "1.125rem", cssVar: "--pgn-typography-font-size-h4-mobile", description: "Heading 4 (mobile, same as desktop)" },
  { name: "h5-mobile", value: "0.875rem", cssVar: "--pgn-typography-font-size-h5-mobile", description: "Heading 5 (mobile, same as desktop)" },
  { name: "h6-mobile", value: "0.75rem", cssVar: "--pgn-typography-font-size-h6-mobile", description: "Heading 6 (mobile, same as desktop)" },
  { name: "display-1-mobile", value: "3.25rem", cssVar: "--pgn-typography-font-size-display-1-mobile", description: "Display 1 (mobile)" },
  { name: "display-2-mobile", value: "3.25rem", cssVar: "--pgn-typography-font-size-display-2-mobile", description: "Display 2 (mobile)" },
  { name: "display-3-mobile", value: "3.25rem", cssVar: "--pgn-typography-font-size-display-3-mobile", description: "Display 3 (mobile)" },
  { name: "display-4-mobile", value: "3.25rem", cssVar: "--pgn-typography-font-size-display-4-mobile", description: "Display 4 (mobile)" },
];

// ─── Additional Font Weights ────────────────────────────────────
export const additionalFontWeights = [
  { name: "base", value: "400", cssVar: "--pgn-typography-font-weight-base", description: "Base font weight (→ normal)" },
  { name: "lead", value: "inherit", cssVar: "--pgn-typography-font-weight-lead", description: "Lead text font weight" },
  { name: "table-th", value: "bold", cssVar: "--pgn-typography-font-weight-table-th", description: "Table heading font weight" },
  { name: "display-1", value: "700", cssVar: "--pgn-typography-font-weight-display-1", description: "Display 1 weight (→ bold)" },
  { name: "display-2", value: "700", cssVar: "--pgn-typography-font-weight-display-2", description: "Display 2 weight (→ bold)" },
  { name: "display-3", value: "700", cssVar: "--pgn-typography-font-weight-display-3", description: "Display 3 weight (→ bold)" },
  { name: "display-4", value: "700", cssVar: "--pgn-typography-font-weight-display-4", description: "Display 4 weight (→ bold)" },
];

// ─── Border Width ───────────────────────────────────────────────
export const borderWidthTokens: BorderWidthToken[] = [
  { name: "default", value: "1px", cssVar: "--pgn-size-border-width", description: "Default border width" },
];

// ─── Additional Spacing ─────────────────────────────────────────
export const additionalSpacingTokens: MiscToken[] = [
  { name: "spacer-base", value: "1rem", cssVar: "--pgn-spacing-spacer-base", description: "Base spacer value" },
  { name: "label-margin-bottom", value: "0.5rem", cssVar: "--pgn-spacing-label-margin-bottom", description: "Label bottom margin" },
  { name: "table-cell-padding", value: "0.75rem", cssVar: "--pgn-spacing-table-cell-padding", description: "Table cell padding" },
  { name: "table-cell-padding-sm", value: "0.3rem", cssVar: "--pgn-spacing-table-cell-padding-sm", description: "Table cell padding (small)" },
  { name: "grid-gutter-width", value: "24px", cssVar: "--pgn-spacing-grid-gutter-width", description: "Grid gutter width" },
];

// ─── Directional Shadows ────────────────────────────────────────
export const directionalShadows: DirectionalShadowGroup[] = [
  {
    direction: "Down",
    description: "Bottom-facing shadows",
    levels: [
      { level: 1, shadow: "0 0.0625rem 0.125rem rgba(0,0,0,0.15), 0 0.0625rem 0.25rem rgba(0,0,0,0.15)" },
      { level: 2, shadow: "0 0.125rem 0.25rem rgba(0,0,0,0.15), 0 0.125rem 0.5rem rgba(0,0,0,0.15)" },
      { level: 3, shadow: "0 0.5rem 1rem rgba(0,0,0,0.15), 0 0.25rem 0.625rem rgba(0,0,0,0.15)" },
      { level: 4, shadow: "0 0.625rem 1.25rem rgba(0,0,0,0.15), 0 0.5rem 1.25rem rgba(0,0,0,0.15)" },
      { level: 5, shadow: "0 1.25rem 2.5rem rgba(0,0,0,0.15), 0 0.5rem 3rem rgba(0,0,0,0.15)" },
    ],
  },
  {
    direction: "Up",
    description: "Top-facing shadows",
    levels: [
      { level: 1, shadow: "0 -0.0625rem 0.125rem rgba(0,0,0,0.15), 0 -0.0625rem 0.25rem rgba(0,0,0,0.15)" },
      { level: 2, shadow: "0 -0.125rem 0.25rem rgba(0,0,0,0.15), 0 -0.125rem 0.5rem rgba(0,0,0,0.15)" },
      { level: 3, shadow: "0 -0.5rem 1rem rgba(0,0,0,0.15), 0 -0.25rem 0.625rem rgba(0,0,0,0.15)" },
      { level: 4, shadow: "0 -0.625rem 1.25rem rgba(0,0,0,0.15), 0 -0.5rem 1.25rem rgba(0,0,0,0.15)" },
      { level: 5, shadow: "0 -1.25rem 2.5rem rgba(0,0,0,0.15), 0 -0.5rem 3rem rgba(0,0,0,0.15)" },
    ],
  },
  {
    direction: "Left",
    description: "Left-facing shadows",
    levels: [
      { level: 1, shadow: "-0.0625rem 0 0.125rem rgba(0,0,0,0.15), -0.0625rem 0 0.25rem rgba(0,0,0,0.15)" },
      { level: 2, shadow: "-0.125rem 0 0.25rem rgba(0,0,0,0.15), -0.125rem 0 0.5rem rgba(0,0,0,0.15)" },
      { level: 3, shadow: "-0.5rem 0 1rem rgba(0,0,0,0.15), -0.25rem 0 0.625rem rgba(0,0,0,0.15)" },
      { level: 4, shadow: "-0.625rem 0 1.25rem rgba(0,0,0,0.15), -0.5rem 0 1.25rem rgba(0,0,0,0.15)" },
      { level: 5, shadow: "-1.25rem 0 2.5rem rgba(0,0,0,0.15), -0.5rem 0 3rem rgba(0,0,0,0.15)" },
    ],
  },
  {
    direction: "Right",
    description: "Right-facing shadows",
    levels: [
      { level: 1, shadow: "0.0625rem 0 0.125rem rgba(0,0,0,0.15), 0.0625rem 0 0.25rem rgba(0,0,0,0.15)" },
      { level: 2, shadow: "0.125rem 0 0.25rem rgba(0,0,0,0.15), 0.125rem 0 0.5rem rgba(0,0,0,0.15)" },
      { level: 3, shadow: "0.5rem 0 1rem rgba(0,0,0,0.15), 0.25rem 0 0.625rem rgba(0,0,0,0.15)" },
      { level: 4, shadow: "0.625rem 0 1.25rem rgba(0,0,0,0.15), 0.5rem 0 1.25rem rgba(0,0,0,0.15)" },
      { level: 5, shadow: "1.25rem 0 2.5rem rgba(0,0,0,0.15), 0.5rem 0 3rem rgba(0,0,0,0.15)" },
    ],
  },
  {
    direction: "Centered",
    description: "Even shadows on all sides",
    levels: [
      { level: 1, shadow: "0 0 0.125rem rgba(0,0,0,0.15), 0 0 0.25rem rgba(0,0,0,0.15)" },
      { level: 2, shadow: "0 0 0.25rem rgba(0,0,0,0.15), 0 0 0.5rem rgba(0,0,0,0.15)" },
      { level: 3, shadow: "0 0 0.625rem rgba(0,0,0,0.15), 0 0 1rem rgba(0,0,0,0.15)" },
      { level: 4, shadow: "0 0 1.25rem rgba(0,0,0,0.15), 0 0 1.25rem rgba(0,0,0,0.15)" },
      { level: 5, shadow: "0 0 2.5rem rgba(0,0,0,0.15), 0 0 3rem rgba(0,0,0,0.15)" },
    ],
  },
];

// ─── Global Misc Tokens ─────────────────────────────────────────
export const miscTokens: MiscToken[] = [
  { name: "yiq-contrasted-threshold", value: "128", description: "YIQ contrast threshold for auto text color selection" },
  { name: "theme-color-interval", value: "8%", description: "Interval for theme color level generation" },
  { name: "print-page-size", value: "a3", description: "Print page size" },
];

// ─── Component Sizes ─────────────────────────────────────────────
export const componentSizes = {
  avatars: [
    { name: "xs", value: "1.5rem" },
    { name: "sm", value: "2.25rem" },
    { name: "base", value: "3rem" },
    { name: "lg", value: "4rem" },
    { name: "xl", value: "6rem" },
    { name: "xxl", value: "11.5rem" },
    { name: "huge", value: "18.75rem" },
  ],
  icons: [
    { name: "inline", value: "0.8em" },
    { name: "xs", value: "1rem" },
    { name: "sm", value: "1.25rem" },
    { name: "md", value: "1.5rem" },
    { name: "lg", value: "1.75rem" },
  ],
  containers: [
    { name: "xs", value: "464px" },
    { name: "sm", value: "708px" },
    { name: "md", value: "952px" },
    { name: "lg", value: "1192px" },
    { name: "xl", value: "1440px" },
  ],
};
