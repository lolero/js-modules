import React from 'react';
import noop from 'lodash/noop';

export enum NavSideDrawerDisplayStatus {
  expanded = 'expanded',
  collapsed = 'collapsed',
  hidden = 'hidden',
}

export type NavSideDrawerDisplayStatusContextValue = {
  navSideDrawerDisplayStatus: NavSideDrawerDisplayStatus;
  setNavSideDrawerDisplayStatus: (
    navDrawerDisplayStatus: NavSideDrawerDisplayStatus,
  ) => void;
};

export const NavSideDrawerDisplayStatusContext =
  React.createContext<NavSideDrawerDisplayStatusContextValue>({
    navSideDrawerDisplayStatus: NavSideDrawerDisplayStatus.expanded,
    setNavSideDrawerDisplayStatus: noop,
  });
