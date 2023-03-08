import {
  createMaterialUiTheme,
  GetThemeComponents,
} from '@js-modules/web-styles-material-ui';
import { ThemePalette } from '@js-modules/apps-travel-log-common-store-redux';
import { Theme } from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';

export const getThemeComponents: GetThemeComponents = (baseTheme: Theme) => ({
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        minHeight: 0,
        height: '40px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        [`&.${tabClasses.selected}`]: {
          color: baseTheme.palette.primary.main,
          '& *': {
            color: 'inherit !important',
          },
        },
      },
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
    lightPaletteOverrides,
    getThemeComponents,
  ),
  [ThemePalette.dark]: createMaterialUiTheme(
    darkPaletteOverrides,
    getThemeComponents,
  ),
};
