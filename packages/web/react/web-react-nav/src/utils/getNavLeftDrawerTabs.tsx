import React from 'react';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { RoutesMetadata } from '../types/routes.types';

/**
 * Get array of Material UI vertical <Tab />s to populate the <NavLeftDrawer/>,
 * through the 'navLeftDrawerContent' prop of <WorkspaceBox />
 *
 * @param {RoutesMetadata} routesMetadata - The metadata for the
 * navigation's <Tab /> tree
 * @param {number} depthLevel - The navigation tree's depth level for which tabs
 * are being retrieved in the function call
 * @param {string} tabsValue - The selected tab's value
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
  tabsValue: string,
  isNavLeftDrawerExpanded: boolean,
  userRoles: string[],
  onClickCallback: () => void,
): React.ReactNode[] {
  const splitTabValue = tabsValue.split('/').slice(1);

  const modulesUpToDepthLevel = splitTabValue.slice(0, depthLevel + 1);

  const tabs = values(routesMetadata).map((routeMetadata) => {
    if (routeMetadata.isHidden && routeMetadata.roles) {
      return null;
    }
    if (routeMetadata.roles) {
      const rolesIntersection = intersection(userRoles, routeMetadata.roles);
      const isUserAuthorized = rolesIntersection.length > 0;
      if (!isUserAuthorized) {
        return null;
      }
    }

    let icon: React.ReactNode = null;
    if (isNavLeftDrawerExpanded) {
      icon = <MuiFaIcon icon={routeMetadata.icon} />;
    } else {
      icon = (
        <Tooltip title={routeMetadata.label} disableInteractive>
          <MuiFaIcon icon={routeMetadata.icon} />
        </Tooltip>
      );
    }

    let label: React.ReactNode = null;
    if (isNavLeftDrawerExpanded) {
      label = <Typography variant="body1">{routeMetadata.label}</Typography>;
    }

    let subTabs: React.ReactNode[] = [];
    if (routeMetadata.subRoutes) {
      subTabs = getNavLeftDrawerTabs(
        routeMetadata.subRoutes,
        depthLevel + 1,
        tabsValue,
        isNavLeftDrawerExpanded,
        userRoles,
        onClickCallback,
      );
    }

    const splitTabPath = routeMetadata.path.split('/').slice(1);
    const tabModulesUpToDepthLevel = splitTabPath.slice(0, depthLevel + 1);
    const isSelectedParentTabSx = isEqual(
      tabModulesUpToDepthLevel,
      modulesUpToDepthLevel,
    );
    const selectedParentTabSx = isSelectedParentTabSx
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
          ml: 2 * depthLevel,
          ...selectedParentTabSx,
        }}
        value={routeMetadata.path}
        icon={icon}
        label={label}
        component={Link}
        to={routeMetadata.path}
        onClick={onClickCallback}
        iconPosition="start"
      />,
      ...subTabs,
    ];
  });

  const tabsFlat = flatten(tabs);

  return tabsFlat;
}
