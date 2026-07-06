import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { useTheme } from '@mui/material/styles';
import type React from 'react';
import { useMemo, useState } from 'react';
import type { RoutesMetadata } from '@js-modules/common-react-nav';
import { NAV_LEFT_DRAWER_TREE_VIEW_ITEM_HEIGHT_MIN } from '../constants/nav.constants';
import type { NavContextValue } from '../contexts/NavContext';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import { getNavLeftDrawerCollapsedWidth } from '../utils/getNavLeftDrawerCollapsedWidth';

export type NavContextProviderProps = {
  routesMetadatas?: RoutesMetadata<IconDefinition>[];
  nonAuthenticatedRedirectPath: string;
  showNavLeftDrawerString?: string;
  hideNavLeftDrawerString?: string;
  showNavRightDrawerString?: string;
  hideNavRightDrawerString?: string;
  navLeftDrawerExpandedWidth?: string;
  navLeftDrawerTreeViewItemHeightMin?: string;
  navRightDrawerCollapsedWidth?: string;
  navRightDrawerExpandedWidth?: string;
  workspaceTopToolbarPaddingYSpacing?: number;
  workspacePaddingXSpacing?: number;
  children: React.ReactNode;
};

export const NavContextProvider: React.FC<NavContextProviderProps> = ({
  routesMetadatas = [],
  nonAuthenticatedRedirectPath,
  showNavLeftDrawerString = 'Show Navigation Menu',
  hideNavLeftDrawerString = 'Hide Navigation Menu',
  showNavRightDrawerString = 'Show Workspace Toolbar',
  hideNavRightDrawerString = 'Hide Workspace Toolbar',
  navLeftDrawerExpandedWidth = '240px',
  navLeftDrawerTreeViewItemHeightMin = NAV_LEFT_DRAWER_TREE_VIEW_ITEM_HEIGHT_MIN,
  navRightDrawerCollapsedWidth = '20px',
  navRightDrawerExpandedWidth = '240px',
  workspaceTopToolbarPaddingYSpacing = 0.5,
  workspacePaddingXSpacing = 2,
  children,
}) => {
  const [navLeftDrawerDisplayStatus, setNavLeftDrawerDisplayStatus] =
    useState<NavDrawerDisplayStatus>(NavDrawerDisplayStatus.expanded);
  const [navRightDrawerDisplayStatus, setNavRightDrawerDisplayStatus] =
    useState<NavDrawerDisplayStatus>(NavDrawerDisplayStatus.hidden);

  const theme = useTheme();

  const navLeftDrawerCollapsedWidth = getNavLeftDrawerCollapsedWidth(
    theme.spacing,
    routesMetadatas,
  );

  const navContextValue: NavContextValue = useMemo(() => {
    return {
      nonAuthorizedRedirectPath: nonAuthenticatedRedirectPath,
      navLeftDrawerDisplayStatus,
      setNavLeftDrawerDisplayStatus,
      navRightDrawerDisplayStatus,
      setNavRightDrawerDisplayStatus,
      showNavLeftDrawerString,
      hideNavLeftDrawerString,
      showNavRightDrawerString,
      hideNavRightDrawerString,
      navLeftDrawerCollapsedWidth,
      navLeftDrawerExpandedWidth,
      navLeftDrawerTreeViewItemHeightMin,
      navRightDrawerCollapsedWidth,
      navRightDrawerExpandedWidth,
      workspaceTopToolbarPaddingYSpacing,
      workspacePaddingXSpacing,
    };
  }, [
    hideNavLeftDrawerString,
    hideNavRightDrawerString,
    navLeftDrawerCollapsedWidth,
    navLeftDrawerDisplayStatus,
    navLeftDrawerExpandedWidth,
    navLeftDrawerTreeViewItemHeightMin,
    navRightDrawerCollapsedWidth,
    navRightDrawerDisplayStatus,
    navRightDrawerExpandedWidth,
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
