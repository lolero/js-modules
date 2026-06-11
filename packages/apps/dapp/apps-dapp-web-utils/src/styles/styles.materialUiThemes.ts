import type { Theme } from '@mui/material/styles';
import { ThemePalette } from '@js-modules/apps-dapp-common-constants';
import { getThemeComponentsWorkspace } from '@js-modules/web-react-nav';
import type { GetThemeComponents } from '@js-modules/web-styles-material-ui';
import { createMaterialUiTheme } from '@js-modules/web-styles-material-ui';

export const getThemeComponents: GetThemeComponents = () => ({
  ...getThemeComponentsWorkspace(),
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
});

const lightPaletteOverrides: Partial<Theme['palette']> = {
  mode: 'light',
};

const darkPaletteOverrides: Partial<Theme['palette']> = {
  mode: 'dark',
};

export const materialUiThemes: Record<ThemePalette, Theme> = {
  [ThemePalette.light]: createMaterialUiTheme(
    {
      palette: lightPaletteOverrides,
    },
    getThemeComponents,
  ),
  [ThemePalette.dark]: createMaterialUiTheme(
    {
      palette: darkPaletteOverrides,
    },
    getThemeComponents,
  ),
};
