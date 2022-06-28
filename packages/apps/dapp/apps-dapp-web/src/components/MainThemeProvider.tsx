import React from 'react';
import { ThemePalette } from '@js-modules/apps-dapp-store-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '../styles/materialUiThemes';
import { MainNavContextProvider } from './MainNavContextProvider';

export const MainThemeProvider: React.FC = () => {
  return (
    <ThemeProvider theme={materialUiThemes[ThemePalette.light]}>
      <CssBaseline />
      <MainNavContextProvider />
    </ThemeProvider>
  );
};
