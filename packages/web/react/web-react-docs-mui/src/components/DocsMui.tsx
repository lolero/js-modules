import type { Theme } from '@mui/material/styles';
import type React from 'react';
import { useState } from 'react';
import type { DocsMuiContextValue } from '../contexts/DocsMuiContext';
import { DocsMuiContext } from '../contexts/DocsMuiContext';
import { DocsMuiThemeProvider } from './DocsMuiThemeProvider';

export type DocsMuiProps = {
  themes: Record<string, Theme>;
};

export function DocsMui({ themes }: DocsMuiProps): React.ReactNode {
  const [themeKeySelected, setThemeKeySelected] = useState(
    Object.keys(themes)[1],
  );

  const docsMuiContextValue: DocsMuiContextValue = {
    themeKeys: Object.keys(themes),
    themeKeySelected: themeKeySelected,
    setThemeKeySelected: setThemeKeySelected,
  };

  return (
    <DocsMuiContext.Provider value={docsMuiContextValue}>
      <DocsMuiThemeProvider theme={themes[themeKeySelected]} />
    </DocsMuiContext.Provider>
  );
}
