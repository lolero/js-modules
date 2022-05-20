import React from 'react';
import { Theme } from '@mui/material/styles';

export enum ScrollDirection {
  down = 'down',
  up = 'up',
}

export type WorkspaceContextValue = {
  navBarHeight: number;
  navDrawerWidth: number;
  workspaceMarginLeft: string | ((theme: Theme) => string);
  contentScrollDirection?: ScrollDirection;
};

export const WorkspaceContext = React.createContext<WorkspaceContextValue>({
  navBarHeight: 0,
  navDrawerWidth: 0,
  workspaceMarginLeft: '0',
});
