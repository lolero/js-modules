import React from 'react';
import noop from 'lodash/noop';

export enum NavDrawerDisplayStatus {
  expanded = 'expanded',
  collapsed = 'collapsed',
  hidden = 'hidden',
}

export type NavContextValue = {
  nonAuthenticatedRedirectPath: string;
  showNavLeftDrawerString: string;
  hideNavLeftDrawerString: string;
  showNavRightDrawerString: string;
  hideNavRightDrawerString: string;
  navLeftDrawerDisplayStatus: NavDrawerDisplayStatus;
  setNavLeftDrawerDisplayStatus: (
    navLeftDrawerDisplayStatus: NavDrawerDisplayStatus,
  ) => void;
  navRightDrawerDisplayStatus: NavDrawerDisplayStatus;
  setNavRightDrawerDisplayStatus: (
    navRightDrawerDisplayStatus: NavDrawerDisplayStatus,
  ) => void;
};

export const NavContext = React.createContext<NavContextValue>({
  nonAuthenticatedRedirectPath: '/',
  showNavLeftDrawerString: '',
  hideNavLeftDrawerString: '',
  showNavRightDrawerString: '',
  hideNavRightDrawerString: '',
  navLeftDrawerDisplayStatus: NavDrawerDisplayStatus.expanded,
  setNavLeftDrawerDisplayStatus: noop,
  navRightDrawerDisplayStatus: NavDrawerDisplayStatus.collapsed,
  setNavRightDrawerDisplayStatus: noop,
});
