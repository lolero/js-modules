import noop from 'lodash/noop';
import { createContext } from 'react';

export type DocsMuiContextValue = {
  themeKeys: string[];
  themeKeySelected: string;
  setThemeKeySelected: (theme: string) => void;
};

export const DocsMuiContext = createContext<DocsMuiContextValue>({
  themeKeys: [],
  themeKeySelected: '',
  setThemeKeySelected: noop,
});
