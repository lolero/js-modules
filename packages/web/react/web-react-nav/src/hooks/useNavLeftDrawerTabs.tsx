import React, { useMemo } from 'react';
import { useSplitRouterPath } from '@js-modules/web-react-hooks';
import { useNavDisplayMetadata } from './useNavDisplayMetadata';
import { RoutesMetadata } from '../types/routes.types';
import { getNavLeftDrawerTabs } from '../utils/getNavLeftDrawerTabs';

type UseNavLeftDrawerTabs = {
  tabsValue: string;
  tabs: React.ReactNode[];
};

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
): UseNavLeftDrawerTabs {
  const { isNavLeftDrawerExpanded, closeNavLeftDrawerCallback } =
    useNavDisplayMetadata();

  const splitRouterPath = useSplitRouterPath();

  const tabsValue = useMemo(() => {
    return `/${splitRouterPath.join('/')}`;
  }, [splitRouterPath]);

  const tabs = useMemo(() => {
    return getNavLeftDrawerTabs(
      tabsMetadata,
      0,
      tabsValue,
      isNavLeftDrawerExpanded,
      userRoles,
      closeNavLeftDrawerCallback,
    );
  }, [
    closeNavLeftDrawerCallback,
    isNavLeftDrawerExpanded,
    tabsMetadata,
    tabsValue,
    userRoles,
  ]);

  return {
    tabsValue,
    tabs,
  };
}
