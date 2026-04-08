import type React from 'react';
import { useCallback, useState } from 'react';

export type TabUtils<TabValueT> = {
  changeTabCallback: (e: React.SyntheticEvent, tabValue: TabValueT) => void;
  selectedTabValue: TabValueT;
};

/**
 * Utils for  Material UI Tabs components
 * @param initialTabValue - Initial tab to be selected on first render.
 * @returns {object}
 */
export function useTabUtils<TabValueT>(
  initialTabValue: TabValueT,
): TabUtils<TabValueT> {
  const [selectedTabValue, setSelectedTabValue] =
    useState<TabValueT>(initialTabValue);

  const changeTabCallback = useCallback(
    (e: React.SyntheticEvent, tabValue: TabValueT) => {
      setSelectedTabValue(tabValue);
    },
    [],
  );

  return {
    selectedTabValue,
    changeTabCallback,
  };
}
