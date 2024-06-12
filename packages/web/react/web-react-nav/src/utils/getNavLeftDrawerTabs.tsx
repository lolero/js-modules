import React from 'react';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import intersection from 'lodash/intersection';
import { RoutesMetadata } from '../types/routes.types';

export type NavLeftDrawerTabs = {
  tabsValue: string | null;
  tabs: React.ReactNode[];
};

/**
 * Get array of Material UI vertical <Tab />s to populate the <NavLeftDrawer/>,
 * through the 'navLeftDrawerContent' prop of <WorkspaceBox />
 *
 * @param {RoutesMetadata} routesMetadata - The metadata for the
 * navigation's <Tab /> tree
 * @param {number} depthLevel - The navigation tree's depth level for which tabs
 * are being retrieved in the function call
 * @param {string} routerPath - The router path
 * @param {boolean} isNavLeftDrawerExpanded - Whether or not the <NavLeftDrawer /> is
 * expanded
 * @param {string[]} userRoles - Access roles of the current authenticated user
 * @param {function} onClickCallback - Callback function to close the
 * <NavLeftDrawer /> when navigation to a tab's path occurs
 *
 * @returns {React.ReactNode[]} Array of <Tab />s
 */
export function getNavLeftDrawerTabs(
  routesMetadata: RoutesMetadata,
  depthLevel: number,
  routerPath: string,
  isNavLeftDrawerExpanded: boolean,
  userRoles: string[],
  onClickCallback: () => void,
): NavLeftDrawerTabs {
  const splitRouterPath = routerPath.split('/').slice(1);
  const modulesUpToDepthLevelPrevious = splitRouterPath.slice(0, depthLevel);
  const modulesUpToDepthLevel = splitRouterPath.slice(0, depthLevel + 1);

  let tabsValue = null;
  const tabs = values(routesMetadata).map((routeMetadata) => {
    const splitRouteMetadataPath = routeMetadata.path.split('/').slice(1);
    const routeMetadataModulesUpToDepthLevelPrevious =
      splitRouteMetadataPath.slice(0, depthLevel);

    if (routeMetadata.isHidden) {
      if (
        isEqual(
          modulesUpToDepthLevelPrevious,
          routeMetadataModulesUpToDepthLevelPrevious,
        )
      ) {
        tabsValue = `/${modulesUpToDepthLevelPrevious.join('/')}`;
      }
      return null;
    }

    if (routeMetadata.roles) {
      const rolesIntersection = intersection(userRoles, routeMetadata.roles);
      const isUserAuthorized = rolesIntersection.length > 0;
      if (!isUserAuthorized) {
        return null;
      }
    }

    let label: React.ReactNode = null;
    if (isNavLeftDrawerExpanded) {
      label = <Typography variant="body1">{routeMetadata.label}</Typography>;
    }

    let subTabs: React.ReactNode[] = [];
    if (routeMetadata.subRoutes) {
      const subNavLeftDrawerTabs = getNavLeftDrawerTabs(
        routeMetadata.subRoutes,
        depthLevel + 1,
        routerPath,
        isNavLeftDrawerExpanded,
        userRoles,
        onClickCallback,
      );

      subTabs = subNavLeftDrawerTabs.tabs;
      if (!isNull(subNavLeftDrawerTabs.tabsValue)) {
        tabsValue = subNavLeftDrawerTabs.tabsValue;
      }
    }

    const splitTabPath = routeMetadata.path.split('/').slice(1);
    const tabModulesUpToDepthLevel = splitTabPath.slice(0, depthLevel + 1);
    const isSelectedParentTab = isEqual(
      tabModulesUpToDepthLevel,
      modulesUpToDepthLevel,
    );
    const selectedParentTabSx = isSelectedParentTab
      ? {
          color: 'primary.main',
          '& *': {
            color: 'inherit !important',
          },
        }
      : {};

    return [
      <Tab
        key={routeMetadata.path}
        sx={{
          minHeight: '40px',
          py: 1,
          ml: 3 * depthLevel,
          justifyContent: 'start',
          ...selectedParentTabSx,
        }}
        value={routeMetadata.path}
        icon={routeMetadata.icon}
        label={label}
        component={Link}
        to={routeMetadata.path}
        onClick={onClickCallback}
        iconPosition="start"
        title={!isNavLeftDrawerExpanded ? routeMetadata.label : undefined}
      />,
      ...subTabs,
    ];
  });

  const tabsFlat = flatten(tabs);

  return {
    tabs: tabsFlat,
    tabsValue,
  };
}
