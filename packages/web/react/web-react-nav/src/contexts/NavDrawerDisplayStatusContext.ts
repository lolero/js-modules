import React from 'react';
import noop from 'lodash/noop';

export enum NavDrawerDisplayStatus {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
  Hidden = 'hidden',
}

export type NavDrawerDisplayStatusContextValue = {
  navDrawerDisplayStatus: NavDrawerDisplayStatus;
  setNavDrawerDisplayStatus: (
    navDrawerDisplayStatus: NavDrawerDisplayStatus,
  ) => void;
};

export const NavDrawerDisplayStatusContext =
  React.createContext<NavDrawerDisplayStatusContextValue>({
    navDrawerDisplayStatus: NavDrawerDisplayStatus.Expanded,
    setNavDrawerDisplayStatus: noop,
  });
