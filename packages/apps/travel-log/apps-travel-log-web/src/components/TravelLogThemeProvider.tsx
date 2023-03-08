import React from 'react';
import { ThemePalette } from '@js-modules/apps-dapp-common-stores-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '../styles/materialUiThemes';
import { TravelLogNavContextProvider } from './TravelLogNavContextProvider';

export const TravelLogThemeProvider: React.FC = () => {
  return (
    <ThemeProvider theme={materialUiThemes[ThemePalette.light]}>
      <CssBaseline />
      <TravelLogNavContextProvider />
    </ThemeProvider>
  );
};
