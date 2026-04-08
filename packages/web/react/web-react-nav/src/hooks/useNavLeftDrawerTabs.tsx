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
import type { NavLeftDrawerTabs } from '../utils/getNavLeftDrawerTabs';
import { getNavLeftDrawerTabs } from '../utils/getNavLeftDrawerTabs';
import { useNavDisplayMetadata } from './useNavDisplayMetadata';

/**
 * React hook to get array of Material UI vertical <Tab />s to populate the
 * <NavLeftDrawer/>,
 *
 * @param {RoutesMetadata<IconDefinition>} tabsMetadata - The metadata for the
 * navigation's <Tab /> tree
 * @param {string[]} userRoles - Access roles of the current authenticated user
 * @param {function} translateCallback - Translation callback function
 *
 * @returns {NavLeftDrawerTabs} Tabs value and array of tabs
 */
export function useNavLeftDrawerTabs(
  tabsMetadata: RoutesMetadata<IconDefinition>,
  userRoles?: string[],
  translateCallback?: (translationKey: string) => string,
): NavLeftDrawerTabs {
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

  const routerPath = useMemo(() => {
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

  const { tabsValue, tabs } = useMemo(() => {
    return getNavLeftDrawerTabs(
      tabsMetadata,
      0,
      routerPath,
      isNavLeftDrawerExpanded,
      reactRouterNavUtils,
      onClickCallback,
      userRoles,
      translateCallback,
    );
  }, [
    tabsMetadata,
    routerPath,
    isNavLeftDrawerExpanded,
    reactRouterNavUtils,
    onClickCallback,
    userRoles,
    translateCallback,
  ]);

  return {
    tabsValue,
    tabs,
  };
}
