import CssBaseline from '@mui/material/CssBaseline';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import type React from 'react';
import { augmentDocsMuiTheme } from '../utils/augmentDocsMuiTheme';
import { DocsMuiLocalizationProvider } from './DocsMuiLocalizationProvider';

export type DocsMuiThemeProviderProps = {
  theme: Theme;
};

export function DocsMuiThemeProvider({
  theme,
}: DocsMuiThemeProviderProps): React.ReactNode {
  const docsMuiTheme = augmentDocsMuiTheme(theme);

  return (
    <ThemeProvider theme={docsMuiTheme}>
      <CssBaseline />
      <DocsMuiLocalizationProvider />
    </ThemeProvider>
  );
}
