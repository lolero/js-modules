import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '@js-modules/apps-travel-log-web-utils';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogNavContextProvider } from './TravelLogNavContextProvider';

export const TravelLogThemeProvider: React.FC = () => {
  const { themePalette } = useStateMainReducerMetadata();

  return (
    <ThemeProvider theme={materialUiThemes[themePalette]}>
      <CssBaseline />
      <TravelLogNavContextProvider />
    </ThemeProvider>
  );
};
