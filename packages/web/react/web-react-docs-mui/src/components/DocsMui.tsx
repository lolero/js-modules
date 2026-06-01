import type { Theme } from '@mui/material/styles';
import type React from 'react';
import { useMemo, useState } from 'react';
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

  const docsMuiContextValue: DocsMuiContextValue = useMemo(() => {
    return {
      themeKeys: Object.keys(themes),
      themeKeySelected: themeKeySelected,
      setThemeKeySelected: setThemeKeySelected,
    };
  }, [themeKeySelected, themes]);

  return (
    <DocsMuiContext.Provider value={docsMuiContextValue}>
      <DocsMuiThemeProvider theme={themes[themeKeySelected]} />
    </DocsMuiContext.Provider>
  );
}
