import React from 'react';
import { ThemePalette } from '@js-modules/apps-vending-machine-common-store-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '../styles/materialUiThemes';
import { VendingMachineNavContextProvider } from './VendingMachineNavContextProvider';

export const VendingMachineThemeProvider: React.FC = () => {
  return (
    <ThemeProvider theme={materialUiThemes[ThemePalette.light]}>
      <CssBaseline />
      <VendingMachineNavContextProvider />
    </ThemeProvider>
  );
};
