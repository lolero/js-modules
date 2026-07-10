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

/**
 * Provides <NavContext /> — the nav/workspace layout configuration (drawer
 * labels, widths, spacing) plus left/right drawer display state.
 * @param props - Component props.
 * @param props.routesMetadatas - Route metadata used to size the collapsed left drawer.
 * @param props.nonAuthenticatedRedirectPath - Path to redirect to when access is unauthorized.
 * @param props.showNavLeftDrawerString - Tooltip label for showing the left drawer.
 * @param props.hideNavLeftDrawerString - Tooltip label for hiding the left drawer.
 * @param props.showNavRightDrawerString - Tooltip label for showing the right drawer.
 * @param props.hideNavRightDrawerString - Tooltip label for hiding the right drawer.
 * @param props.navLeftDrawerExpandedWidth - Width of the expanded left drawer.
 * @param props.navLeftDrawerTreeViewItemHeightMin - Minimum height of a left-drawer tree item.
 * @param props.navRightDrawerCollapsedWidth - Width of the collapsed right drawer.
 * @param props.navRightDrawerExpandedWidth - Width of the expanded right drawer.
 * @param props.workspaceTopToolbarPaddingYSpacing - Vertical padding (theme spacing) of the workspace top toolbar.
 * @param props.workspacePaddingXSpacing - Horizontal padding (theme spacing) of the workspace content.
 * @param props.children - Subtree that consumes the nav context.
 * @returns The nav context provider wrapping `children`.
 */
export function NavContextProvider({
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
}: NavContextProviderProps): React.ReactNode {
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
}
