import React from 'react';
import noop from 'lodash/noop';
import { Theme } from '@mui/material/styles';
import { NavDrawerDisplayStatus } from './NavDrawerDisplayStatusContext';

export type WorkspaceBoxContextValue = {
  isContentScroll: boolean;
  navBarHeight: number;
  navDrawerDisplayStatus: NavDrawerDisplayStatus;
  navDrawerWidth: number;
  setNavDrawerDisplayStatus: (
    navDrawerDisplayStatus: NavDrawerDisplayStatus,
  ) => void;

  workspaceMarginLeft: string | ((theme: Theme) => string);
};

const WorkspaceBoxContext = React.createContext<WorkspaceBoxContextValue>({
  navDrawerDisplayStatus: NavDrawerDisplayStatus.Expanded,
  setNavDrawerDisplayStatus: noop,
  navDrawerWidth: 0,
  navBarHeight: 0,
  workspaceMarginLeft: '0',
  isContentScroll: false,
});

export default WorkspaceBoxContext;
