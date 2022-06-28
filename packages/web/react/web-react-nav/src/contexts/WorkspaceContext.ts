import React from 'react';
import { Theme } from '@mui/material/styles';

export enum ScrollDirection {
  down = 'down',
  up = 'up',
}

export type WorkspaceContextValue = {
  navTopToolbarHeight: number;
  navLeftDrawerWidth: number;
  navRightDrawerWidth: number;
  workspaceTopToolbarHeight: number;
  workspaceMarginLeft: string | ((theme: Theme) => string);
  workspaceMarginRight: string | ((theme: Theme) => string);
  workspaceScrollTop: number;
  workspaceScrollDirection?: ScrollDirection;
};

export const WorkspaceContext = React.createContext<WorkspaceContextValue>({
  navTopToolbarHeight: 0,
  navLeftDrawerWidth: 0,
  navRightDrawerWidth: 0,
  workspaceTopToolbarHeight: 0,
  workspaceMarginLeft: '0',
  workspaceMarginRight: '0',
  workspaceScrollTop: 0,
});
