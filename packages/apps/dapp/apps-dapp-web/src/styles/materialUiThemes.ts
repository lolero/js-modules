import { createMaterialUiTheme } from '@js-modules/web-styles-material-ui';
import { ThemePalette } from '@js-modules/apps-dapp-store-redux';
import { Theme } from '@mui/material/styles';

export const materialUiThemes: Record<ThemePalette, Theme> = {
  [ThemePalette.light]: createMaterialUiTheme(),
  [ThemePalette.dark]: createMaterialUiTheme(),
};
