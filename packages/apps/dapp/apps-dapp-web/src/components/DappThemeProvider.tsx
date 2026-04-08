import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type React from 'react';
import { useStateMainReducerMetadata } from '@js-modules/apps-dapp-common-store-redux';
import { materialUiThemes } from '@js-modules/apps-dapp-web-utils';
import { DappNavContextProvider } from './DappNavContextProvider';

export const DappThemeProvider: React.FC = () => {
  const { themePalette } = useStateMainReducerMetadata();

  return (
    <ThemeProvider theme={materialUiThemes[themePalette]}>
      <CssBaseline />
      <DappNavContextProvider />
    </ThemeProvider>
  );
};
