import type React from 'react';
import { useState } from 'react';

export type TabUtils<TabValueT> = {
  changeTabCallback: (e: React.SyntheticEvent, tabValue: TabValueT) => void;
  selectedTabValue: TabValueT;
};

/**
 * State utils for MUI `Tabs` components: tracks the selected tab value.
 * @param initialTabValue - Initial tab to be selected on first render.
 * @returns Selected tab value and the tab-change callback.
 */
export function useTabUtils<TabValueT>(
  initialTabValue: TabValueT,
): TabUtils<TabValueT> {
  const [selectedTabValue, setSelectedTabValue] =
    useState<TabValueT>(initialTabValue);

  function changeTabCallback(
    _e: React.SyntheticEvent,
    tabValue: TabValueT,
  ): void {
    setSelectedTabValue(tabValue);
  }

  return {
    selectedTabValue,
    changeTabCallback,
  };
}
