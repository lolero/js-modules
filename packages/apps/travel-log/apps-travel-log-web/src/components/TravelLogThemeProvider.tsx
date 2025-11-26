import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '@js-modules/apps-travel-log-web-components';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogNavContextProvider } from './TravelLogNavContextProvider';

export const TravelLogThemeProvider: React.FC = () => {
  const { themePalette } = useStateMainReducerMetadata();

  const theme = useMemo(() => {
    const themeTemp = materialUiThemes[themePalette];
    return themeTemp;
  }, [themePalette]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TravelLogNavContextProvider />
    </ThemeProvider>
  );
};
