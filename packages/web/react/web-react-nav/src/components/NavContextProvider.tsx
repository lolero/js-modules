import React, { useMemo, useState } from 'react';
import {
  NavContextValue,
  NavDrawerDisplayStatus,
  NavContext,
} from '../contexts/NavContext';

export type NavContextProviderProps = {
  nonAuthenticatedRedirectPath: string;
  showNavLeftDrawerString?: string;
  hideNavLeftDrawerString?: string;
  showNavRightDrawerString?: string;
  hideNavRightDrawerString?: string;
  navLeftDrawerCollapsedWidth?: string;
  navLeftDrawerExpandedWidth?: string;
  workspaceTopToolbarPaddingYSpacing?: number;
  workspacePaddingXSpacing?: number;
  children: React.ReactNode;
};

export const NavContextProvider: React.FC<NavContextProviderProps> = ({
  nonAuthenticatedRedirectPath,
  showNavLeftDrawerString = 'Show Navigation Menu',
  hideNavLeftDrawerString = 'Hide Navigation Menu',
  showNavRightDrawerString = 'Show Workspace Toolbar',
  hideNavRightDrawerString = 'Hide Workspace Toolbar',
  navLeftDrawerCollapsedWidth = '80px',
  navLeftDrawerExpandedWidth = '240px',
  workspaceTopToolbarPaddingYSpacing = 0.5,
  workspacePaddingXSpacing = 2,
  children,
}) => {
  const [navLeftDrawerDisplayStatus, setNavLeftDrawerDisplayStatus] =
    useState<NavDrawerDisplayStatus>(NavDrawerDisplayStatus.expanded);
  const [navRightDrawerDisplayStatus, setNavRightDrawerDisplayStatus] =
    useState<NavDrawerDisplayStatus>(NavDrawerDisplayStatus.hidden);

  const navContextValue: NavContextValue = useMemo(() => {
    return {
      nonAuthenticatedRedirectPath,
      showNavLeftDrawerString,
      hideNavLeftDrawerString,
      showNavRightDrawerString,
      hideNavRightDrawerString,
      navLeftDrawerDisplayStatus,
      setNavLeftDrawerDisplayStatus,
      navRightDrawerDisplayStatus,
      setNavRightDrawerDisplayStatus,
      navLeftDrawerCollapsedWidth,
      navLeftDrawerExpandedWidth,
      workspaceTopToolbarPaddingYSpacing,
      workspacePaddingXSpacing,
    };
  }, [
    hideNavLeftDrawerString,
    hideNavRightDrawerString,
    navLeftDrawerCollapsedWidth,
    navLeftDrawerDisplayStatus,
    navLeftDrawerExpandedWidth,
    navRightDrawerDisplayStatus,
    nonAuthenticatedRedirectPath,
    showNavLeftDrawerString,
    showNavRightDrawerString,
    workspacePaddingXSpacing,
    workspaceTopToolbarPaddingYSpacing,
  ]);

  return (
    <NavContext.Provider value={navContextValue}>
      {children}
    </NavContext.Provider>
  );
};
