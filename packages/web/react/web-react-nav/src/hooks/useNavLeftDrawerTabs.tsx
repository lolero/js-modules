import { useMemo } from 'react';
import { useSplitRouterPath } from '@js-modules/web-react-hooks';
import { useNavDisplayMetadata } from './useNavDisplayMetadata';
import { RoutesMetadata } from '../types/routes.types';
import {
  getNavLeftDrawerTabs,
  NavLeftDrawerTabs,
} from '../utils/getNavLeftDrawerTabs';

/**
 * React hook to get array of Material UI vertical <Tab />s to populate the
 * <NavLeftDrawer/>,
 *
 * @param {RoutesMetadata} tabsMetadata - The metadata for the
 * navigation's <Tab /> tree
 * @param {string[]} userRoles - Access roles of the current authenticated user
 *
 * @returns {UseNavLeftDrawerTabs} Tabs value and array of tabs
 */
export function useNavLeftDrawerTabs(
  tabsMetadata: RoutesMetadata,
  userRoles: string[] = [],
): NavLeftDrawerTabs {
  const { isNavLeftDrawerExpanded, closeNavLeftDrawerCallback } =
    useNavDisplayMetadata();

  const splitRouterPath = useSplitRouterPath();

  const routerPath = useMemo(() => {
    return `/${splitRouterPath.join('/')}`;
  }, [splitRouterPath]);

  const { tabsValue, tabs } = useMemo(() => {
    return getNavLeftDrawerTabs(
      tabsMetadata,
      0,
      routerPath,
      isNavLeftDrawerExpanded,
      userRoles,
      closeNavLeftDrawerCallback,
    );
  }, [
    closeNavLeftDrawerCallback,
    isNavLeftDrawerExpanded,
    tabsMetadata,
    routerPath,
    userRoles,
  ]);

  return {
    tabsValue,
    tabs,
  };
}
