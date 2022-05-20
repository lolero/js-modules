import React from 'react';
import noop from 'lodash/noop';

export enum NavSideDrawerDisplayStatus {
  expanded = 'expanded',
  collapsed = 'collapsed',
  hidden = 'hidden',
}

export type NavContextValue = {
  shortLogo: React.ReactNode;
  longLogo: React.ReactNode;
  homePath: string;
  sideToolbar: React.ReactNode;
  sideFooter: React.ReactNode;
  nonAuthenticatedRedirectPath: string;
  navSideDrawerDisplayStatus: NavSideDrawerDisplayStatus;
  setNavSideDrawerDisplayStatus: (
    navDrawerDisplayStatus: NavSideDrawerDisplayStatus,
  ) => void;
};

export const NavContext = React.createContext<NavContextValue>({
  shortLogo: null,
  longLogo: null,
  homePath: '/',
  sideToolbar: null,
  sideFooter: null,
  nonAuthenticatedRedirectPath: '/',
  navSideDrawerDisplayStatus: NavSideDrawerDisplayStatus.expanded,
  setNavSideDrawerDisplayStatus: noop,
});
