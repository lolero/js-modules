import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import pick from 'lodash/pick';
import values from 'lodash/values';
import type React from 'react';
import type { RoutesMetadata } from '@js-modules/common-react-nav';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import type { WebRouterLinkComponent } from '@js-modules/web-react-router';
import {
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_ICON_SIZE_REM,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_PADDING_X_SPACING,
} from '../constants/nav.constants';
import {
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE,
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE,
} from '../styles/cssClassNames';
import {
  navLeftDrawerTreeViewItemLabelSx,
  navLeftDrawerTreeViewItemLinkSx,
} from '../styles/navLeftDrawerTreeViewItemStyles';

export type ActiveLineTreeViewItemMetadata = {
  path: string;
  icon: IconDefinition;
  label: string;
  depth: number;
  isExpandable: boolean;
};

export type TreeViewMetadata = {
  activeLineTreeViewItemMetadatas: ActiveLineTreeViewItemMetadata[];
  pathActive: string | null;
  pathsExpandable: string[];
  pathsExpandedActive: string[];
  pathsParentByPath: Record<string, string>;
  treeViewItems: React.ReactNode[];
};

/**
 * Get metadata of nested Material UI <TreeItem />s to populate the
 * <NavLeftDrawer/>, through the 'navLeftDrawerContent' prop of <WorkspaceBox />
 * @param routesMetadata - Metadata for the navigation's <TreeItem /> tree
 * @param depthLevel - Navigation tree's depth level for which
 * TreeViewMetadata is being retrieved in the function call.
 * @param pathRouter - Router path.
 * @param pathRouteMetadata - Path of current RouteMetadata.
 * @param isNavLeftDrawerExpanded - Whether <NavLeftDrawer /> is expanded.
 * @param LinkComponent - Router-agnostic link component that renders each
 * TreeViewItem as a navigable anchor (supplied by the app's router adapter).
 * @param onClickCallback - TreeViewItem navigation callback function.
 * @param userRoles - Access roles of the current authenticated user.
 * @param translateCallback - Translation callback function.
 * @returns Tree view metadata.
 */
export function getNavLeftDrawerTreeViewMetadata(
  routesMetadata: RoutesMetadata<IconDefinition>,
  depthLevel: number,
  pathRouter: string,
  pathRouteMetadata: string | null,
  isNavLeftDrawerExpanded: boolean,
  LinkComponent: WebRouterLinkComponent,
  onClickCallback: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void,
  userRoles: string[] = [],
  translateCallback: (translationKey: string) => string = (translationKey) =>
    translationKey,
): TreeViewMetadata {
  const splitRouterPath = pathRouter.split('/').slice(1);

  let pathActive: string | null = null;
  const pathsExpandable: string[] = [];
  const pathsExpandedActive: string[] = [];
  const pathsParentByPath: TreeViewMetadata['pathsParentByPath'] = {};
  let activeLineTreeViewItemMetadatas: ActiveLineTreeViewItemMetadata[] = [];

  const treeViewItems = values(routesMetadata).flatMap((routeMetadata) => {
    const splitRouteMetadataPath = routeMetadata.path.split('/').slice(1);
    const isActive = isEqual(splitRouterPath, splitRouteMetadataPath);

    if (routeMetadata.roles) {
      const rolesIntersection = intersection(userRoles, routeMetadata.roles);
      const isUserAuthorized = rolesIntersection.length > 0;
      if (!isUserAuthorized) {
        return [];
      }
    }

    let subTreeViewItems: React.ReactNode[] = [];
    let subActiveLineTreeViewItemMetadatas: ActiveLineTreeViewItemMetadata[] =
      [];
    let subContainsActive = false;
    if (routeMetadata.subRoutes) {
      const subNavLeftDrawerTreeViewMetadata = getNavLeftDrawerTreeViewMetadata(
        routeMetadata.subRoutes,
        depthLevel + 1,
        pathRouter,
        // A hidden route is not a visible ancestor, so its children inherit its
        // own ancestor rather than its path.
        routeMetadata.isHidden ? pathRouteMetadata : routeMetadata.path,
        isNavLeftDrawerExpanded,
        LinkComponent,
        onClickCallback,
        userRoles,
        translateCallback,
      );

      subContainsActive = !isNull(subNavLeftDrawerTreeViewMetadata.pathActive);

      if (!routeMetadata.isHidden) {
        subTreeViewItems = subNavLeftDrawerTreeViewMetadata.treeViewItems;
        subActiveLineTreeViewItemMetadatas =
          subNavLeftDrawerTreeViewMetadata.activeLineTreeViewItemMetadatas;
        pathsExpandedActive.push(
          ...subNavLeftDrawerTreeViewMetadata.pathsExpandedActive,
        );
        pathsExpandable.push(
          ...subNavLeftDrawerTreeViewMetadata.pathsExpandable,
        );
        Object.assign(
          pathsParentByPath,
          subNavLeftDrawerTreeViewMetadata.pathsParentByPath,
        );
        if (subContainsActive) {
          pathActive = subNavLeftDrawerTreeViewMetadata.pathActive;
        }
      }
    }

    const isActiveLine = isActive || subContainsActive;

    // A hidden route renders nothing, but if the active route is it or lives in
    // its subtree, highlight its nearest visible ancestor.
    if (routeMetadata.isHidden) {
      if (isActiveLine && !isNull(pathRouteMetadata)) {
        pathActive = pathRouteMetadata;
      }
      return [];
    }

    let label: React.ReactNode = null;
    if (isNavLeftDrawerExpanded) {
      label = (
        <Typography variant="body1" sx={navLeftDrawerTreeViewItemLabelSx}>
          {translateCallback(routeMetadata.label)}
        </Typography>
      );
    }

    if (pathRouteMetadata !== null) {
      pathsParentByPath[routeMetadata.path] = pathRouteMetadata;
    }

    if (subTreeViewItems.length > 0) {
      pathsExpandable.push(routeMetadata.path);
    }

    if (isActive) {
      pathActive = `/${splitRouteMetadataPath.join('/')}`;
    }
    const activeLineTreeViewItemSx = isActiveLine
      ? {
          color: 'primary.main',
        }
      : {};

    if (isActiveLine) {
      activeLineTreeViewItemMetadatas = [
        {
          path: routeMetadata.path,
          icon: routeMetadata.icon,
          label: translateCallback(routeMetadata.label),
          depth: depthLevel,
          isExpandable: subTreeViewItems.length > 0,
        },
        ...subActiveLineTreeViewItemMetadatas,
      ];
    }

    const isActiveLineWithSubTreeViewItems =
      isActiveLine && subTreeViewItems.length > 0;
    if (isActiveLineWithSubTreeViewItems) {
      pathsExpandedActive.push(routeMetadata.path);
    }

    const isActiveTreeViewItem = isActive && subTreeViewItems.length === 0;

    let treeViewItemClassName: string | undefined;
    if (isActiveLineWithSubTreeViewItems) {
      treeViewItemClassName = CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE;
    } else if (isActiveTreeViewItem) {
      treeViewItemClassName = CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE;
    }

    return [
      <TreeItem
        key={routeMetadata.path}
        itemId={routeMetadata.path}
        className={treeViewItemClassName}
        label={
          <ButtonBase
            component={LinkComponent}
            sx={{
              ...navLeftDrawerTreeViewItemLinkSx,
              width: '100%',
              height: '100%',
              px: NAV_LEFT_DRAWER_TREE_VIEW_ITEM_PADDING_X_SPACING,
              color: 'inherit',
              ...activeLineTreeViewItemSx,
            }}
            href={routeMetadata.path}
            onClick={onClickCallback}
            title={!isNavLeftDrawerExpanded ? routeMetadata.label : undefined}
            data-key={JSON.stringify(
              pick(routeMetadata, ['path', 'keepQueryParamsKeys']),
              null,
              2,
            )}
          >
            <MuiFaIcon
              icon={routeMetadata.icon}
              sx={{
                fontSize: `${NAV_LEFT_DRAWER_TREE_VIEW_ITEM_ICON_SIZE_REM}rem`,
              }}
            />
            {label}
          </ButtonBase>
        }
      >
        {subTreeViewItems}
      </TreeItem>,
    ];
  });

  return {
    activeLineTreeViewItemMetadatas,
    pathActive,
    pathsExpandable,
    pathsExpandedActive,
    pathsParentByPath,
    treeViewItems,
  };
}
