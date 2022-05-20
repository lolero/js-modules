import React from 'react';
import noop from 'lodash/noop';
import { Theme } from '@mui/material/styles';
import { NavSideDrawerDisplayStatus } from './NavSideDrawerDisplayStatusContext';

export enum ScrollDirection {
  down = 'down',
  up = 'up',
}

export type WorkspaceBoxContextValue = {
  navBarHeight: number;
  navDrawerWidth: number;
  workspaceMarginLeft: string | ((theme: Theme) => string);
  navSideDrawerDisplayStatus: NavSideDrawerDisplayStatus;
  setNavSideDrawerDisplayStatus: (
    navDrawerDisplayStatus: NavSideDrawerDisplayStatus,
  ) => void;
  contentScrollDirection?: ScrollDirection;
};

export const WorkspaceBoxContext =
  React.createContext<WorkspaceBoxContextValue>({
    navBarHeight: 0,
    navDrawerWidth: 0,
    workspaceMarginLeft: '0',
    navSideDrawerDisplayStatus: NavSideDrawerDisplayStatus.expanded,
    setNavSideDrawerDisplayStatus: noop,
  });
