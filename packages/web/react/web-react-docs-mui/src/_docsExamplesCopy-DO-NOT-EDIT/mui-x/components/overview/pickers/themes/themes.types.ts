// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

export type Themes = 'default' | 'md3' | 'custom';

export type PaletteMode = 'light' | 'dark';
export type Layout = 'horizontal' | 'vertical';
export type Corner = 'medium' | 'rectangular' | 'rounded';
export type TypographyType = 'default' | 'Inter' | 'Menlo';
export type Density = 'medium' | 'compact' | 'spacious';

export type Config = {
  selectedTheme: Themes;
  color: string;
  layout: Layout;
  density: Density;
  corner: Corner;
  typography: TypographyType;
};
