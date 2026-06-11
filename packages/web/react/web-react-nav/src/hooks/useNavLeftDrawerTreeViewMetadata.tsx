import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type {
  RouteMetadata,
  RoutesMetadata,
} from '@js-modules/common-react-nav';
import { useSplitRouterPath } from '@js-modules/web-react-utils';
import type { ReactRouterNavUtils } from '../types/routes.types';
import type { TreeViewMetadata } from '../utils/getNavLeftDrawerTreeViewMetadata';
import { getNavLeftDrawerTreeViewMetadata } from '../utils/getNavLeftDrawerTreeViewMetadata';
import { useNavDisplayMetadata } from './useNavDisplayMetadata';

/**
 * React hook to get metadata of nested <TreeItem />s for <NavLeftDrawer />.
 * @param routesMetadata - RoutesMetadata for the navigation TreeView.
 * @param userRoles - Access roles of the current authenticated user.
 * @param translateCallback - Translation callback function.
 * @returns Tree view metadata.
 */
export function useNavLeftDrawerTreeViewMetadata(
  routesMetadata: RoutesMetadata<IconDefinition>,
  userRoles?: string[],
  translateCallback?: (translationKey: string) => string,
): TreeViewMetadata {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const reactRouterNavUtils: ReactRouterNavUtils = useMemo(() => {
    return {
      navigate,
      location,
      searchParams,
    };
  }, [location, navigate, searchParams]);

  const { isNavLeftDrawerExpanded, closeNavLeftDrawerCallback } =
    useNavDisplayMetadata();

  const splitRouterPath = useSplitRouterPath();

  const pathRouter = useMemo(() => {
    return `/${splitRouterPath.join('/')}`;
  }, [splitRouterPath]);

  const onClickCallback = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const routeMetadataPartialJson =
        event.currentTarget.getAttribute('data-key');
      const routeMetadataPartial = JSON.parse(
        routeMetadataPartialJson!,
      ) as Pick<RouteMetadata<IconDefinition>, 'path' | 'keepQueryParamsKeys'>;

      if (!routeMetadataPartial.keepQueryParamsKeys) {
        closeNavLeftDrawerCallback();
        return;
      }

      const queryParamsKeys = [
        ...reactRouterNavUtils.searchParams.keys().map((key: string) => key),
      ];
      const queryParamsKeysKeep = intersection(
        queryParamsKeys,
        routeMetadataPartial.keepQueryParamsKeys,
      );

      if (isEmpty(queryParamsKeysKeep)) {
        closeNavLeftDrawerCallback();
        return;
      }

      const queryParamsKeep: URLSearchParams = new URLSearchParams();
      queryParamsKeysKeep.forEach((key) => {
        queryParamsKeep.set(key, reactRouterNavUtils.searchParams.get(key)!);
      });

      const newPath = `${
        routeMetadataPartial.path
      }?${queryParamsKeep.toString()}`;

      event.preventDefault();

      void reactRouterNavUtils.navigate(newPath);
    },
    [closeNavLeftDrawerCallback, reactRouterNavUtils],
  );

  const {
    pathActive,
    treeViewItems,
    pathsExpandedActive,
    activeLineTreeViewItemMetadatas,
    pathsExpandable,
    pathsParentByPath,
  } = useMemo(() => {
    return getNavLeftDrawerTreeViewMetadata(
      routesMetadata,
      0,
      pathRouter,
      null,
      isNavLeftDrawerExpanded,
      reactRouterNavUtils,
      onClickCallback,
      userRoles,
      translateCallback,
    );
  }, [
    routesMetadata,
    pathRouter,
    isNavLeftDrawerExpanded,
    reactRouterNavUtils,
    onClickCallback,
    userRoles,
    translateCallback,
  ]);

  return {
    activeLineTreeViewItemMetadatas,
    pathActive,
    pathsExpandable,
    pathsExpandedActive,
    pathsParentByPath,
    treeViewItems,
  };
}
