import React from 'react';
import noop from 'lodash/noop';

export enum NavDrawerDisplayStatus {
  expanded = 'expanded',
  collapsed = 'collapsed',
  hidden = 'hidden',
}

export type NavContextValue = {
  nonAuthorizedRedirectPath: string;
  navLeftDrawerDisplayStatus: NavDrawerDisplayStatus;
  setNavLeftDrawerDisplayStatus: (
    navLeftDrawerDisplayStatus: NavDrawerDisplayStatus,
  ) => void;
  navRightDrawerDisplayStatus: NavDrawerDisplayStatus;
  setNavRightDrawerDisplayStatus: (
    navRightDrawerDisplayStatus: NavDrawerDisplayStatus,
  ) => void;
  showNavLeftDrawerString: string;
  hideNavLeftDrawerString: string;
  showNavRightDrawerString: string;
  hideNavRightDrawerString: string;
  navLeftDrawerCollapsedWidth: string;
  navLeftDrawerExpandedWidth: string;
  navRightDrawerCollapsedWidth: string;
  navRightDrawerExpandedWidth: string;
  workspaceTopToolbarPaddingYSpacing: number;
  workspacePaddingXSpacing: number;
};

export const NavContext = React.createContext<NavContextValue>({
  nonAuthorizedRedirectPath: '/',
  navLeftDrawerDisplayStatus: NavDrawerDisplayStatus.expanded,
  setNavLeftDrawerDisplayStatus: noop,
  navRightDrawerDisplayStatus: NavDrawerDisplayStatus.collapsed,
  setNavRightDrawerDisplayStatus: noop,
  showNavLeftDrawerString: '',
  hideNavLeftDrawerString: '',
  showNavRightDrawerString: '',
  hideNavRightDrawerString: '',
  navLeftDrawerCollapsedWidth: '0',
  navLeftDrawerExpandedWidth: '0',
  navRightDrawerCollapsedWidth: '0',
  navRightDrawerExpandedWidth: '0',
  workspaceTopToolbarPaddingYSpacing: 0,
  workspacePaddingXSpacing: 0,
});
