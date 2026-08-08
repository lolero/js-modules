import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';
import type React from 'react';
import type {
  RouteMetadata,
  RoutesMetadata,
} from '@js-modules/common-react-nav';
import { useSplitRouterPath, useWebRouter } from '@js-modules/web-react-router';
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
  const { LinkComponent, searchParams, pathPush } = useWebRouter();
  const splitRouterPath = useSplitRouterPath();

  const { isNavLeftDrawerExpanded, closeNavLeftDrawerCallback } =
    useNavDisplayMetadata();

  const pathRouter = `/${splitRouterPath.join('/')}`;

  function onClickCallback(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void {
    const routeMetadataPartialJson =
      event.currentTarget.getAttribute('data-key');
    const routeMetadataPartial = JSON.parse(routeMetadataPartialJson!) as Pick<
      RouteMetadata<IconDefinition>,
      'path' | 'keepQueryParamsKeys'
    >;

    if (!routeMetadataPartial.keepQueryParamsKeys) {
      closeNavLeftDrawerCallback();
      return;
    }

    const queryParamsKeys = [...searchParams.keys().map((key: string) => key)];
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
      queryParamsKeep.set(key, searchParams.get(key)!);
    });

    const newPath = `${
      routeMetadataPartial.path
    }?${queryParamsKeep.toString()}`;

    event.preventDefault();

    pathPush(newPath);
  }

  const {
    pathActive,
    treeViewItems,
    pathsExpandedActive,
    activeLineTreeViewItemMetadatas,
    pathsExpandable,
    pathsParentByPath,
  } = getNavLeftDrawerTreeViewMetadata(
    routesMetadata,
    0,
    pathRouter,
    null,
    isNavLeftDrawerExpanded,
    LinkComponent,
    onClickCallback,
    userRoles,
    translateCallback,
  );

  return {
    activeLineTreeViewItemMetadatas,
    pathActive,
    pathsExpandable,
    pathsExpandedActive,
    pathsParentByPath,
    treeViewItems,
  };
}
