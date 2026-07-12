import type { Enum } from '@js-modules/common-utils-general';

export const ThemePalette = {
  light: 'light',
  dark: 'dark',
} as const;
export type ThemePalette = Enum<typeof ThemePalette>;
