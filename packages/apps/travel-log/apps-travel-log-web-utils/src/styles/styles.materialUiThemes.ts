import {
  createMaterialUiTheme,
  GetThemeComponents,
} from '@js-modules/web-styles-material-ui';
import { Theme } from '@mui/material/styles';
import { drawerClasses } from '@mui/material/Drawer';
import { tabClasses } from '@mui/material/Tab';
import { ThemePalette } from '@js-modules/apps-travel-log-common-constants';
import { CSS_CLASSNAME__NAV_LEFT_DRAWER } from '@js-modules/web-react-nav';

export const getThemeComponents: GetThemeComponents = (baseTheme: Theme) => ({
  MuiDrawer: {
    styleOverrides: {
      root: {
        [`&.${CSS_CLASSNAME__NAV_LEFT_DRAWER}`]: {
          [`& > .${drawerClasses.paper}`]: {
            [`.${tabClasses.root}`]: {
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
      },
    },
  },
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
  [ThemePalette.light]: createMaterialUiTheme({
    getThemeComponents,
    paletteOverrides: lightPaletteOverrides,
  }),
  [ThemePalette.dark]: createMaterialUiTheme({
    getThemeComponents,
    paletteOverrides: darkPaletteOverrides,
  }),
};
