import React, { useMemo } from 'react';
import { useSplitRouterPath } from '@js-modules/web-react-hooks';
import { useNavDisplayMetadata } from './useNavDisplayMetadata';
import { NavLeftDrawerTabsMetadata } from '../types/navLeftDrawerTabs.types';
import { getNavLeftDrawerTabs } from '../utils/getNavLeftDrawerTabs';

type UseNavLeftDrawerTabs = {
  tabsValue: string;
  tabs: React.ReactNode[];
};

/**
 * React hook to get array of Material UI vertical <Tab />s to populate the
 * <NavLeftDrawer/>,
 *
 * @param {NavLeftDrawerTabsMetadata} tabsMetadata - The metadata for the
 * navigation's <Tab /> tree
 *
 * @returns {UseNavLeftDrawerTabs} Tabs value and array of tabs
 */
export function useNavLeftDrawerTabs(
  tabsMetadata: NavLeftDrawerTabsMetadata,
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
      closeNavLeftDrawerCallback,
    );
  }, [
    closeNavLeftDrawerCallback,
    isNavLeftDrawerExpanded,
    tabsMetadata,
    tabsValue,
  ]);

  return {
    tabsValue,
    tabs,
  };
}
