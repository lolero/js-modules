import React, { useMemo, useState } from 'react';
import {
  NavContext,
  NavContextValue,
  NavDrawerDisplayStatus,
} from '@js-modules/web-react-nav';

export type NavContextProviderProps = {
  nonAuthenticatedRedirectPath: string;
  showNavLeftDrawerString?: string;
  hideNavLeftDrawerString?: string;
  showNavRightDrawerString?: string;
  hideNavRightDrawerString?: string;
  children: React.ReactNode;
};

export const NavContextProvider: React.FC<NavContextProviderProps> = ({
  nonAuthenticatedRedirectPath,
  showNavLeftDrawerString = 'Show Navigation Menu',
  hideNavLeftDrawerString = 'Hide Navigation Menu',
  showNavRightDrawerString = 'Show Workspace Toolbar',
  hideNavRightDrawerString = 'Hide Workspace Toolbar',
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
    };
  }, [
    hideNavLeftDrawerString,
    hideNavRightDrawerString,
    navLeftDrawerDisplayStatus,
    navRightDrawerDisplayStatus,
    nonAuthenticatedRedirectPath,
    showNavLeftDrawerString,
    showNavRightDrawerString,
  ]);

  return (
    <NavContext.Provider value={navContextValue}>
      {children}
    </NavContext.Provider>
  );
};
