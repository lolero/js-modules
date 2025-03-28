import React from 'react';
import { ThemePalette } from '@js-modules/apps-travel-log-common-store-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '@js-modules/apps-travel-log-web-components';
import { TravelLogNavContextProvider } from './TravelLogNavContextProvider';

export const TravelLogThemeProvider: React.FC = () => {
  return (
    <ThemeProvider theme={materialUiThemes[ThemePalette.dark]}>
      <CssBaseline />
      <TravelLogNavContextProvider />
    </ThemeProvider>
  );
};
