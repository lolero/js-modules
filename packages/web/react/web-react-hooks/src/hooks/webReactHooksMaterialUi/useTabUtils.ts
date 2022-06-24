import React, { useCallback, useState } from 'react';

export type TabUtils<TabValueT> = {
  changeTabCallback: (e: React.SyntheticEvent, tabValue: TabValueT) => void;
  selectedTabValue: TabValueT;
};

/**
 * Utility hoof to abstract the management of Material UI Tabs components
 *
 * @param {number} initialTabValue - The initial tab that should be selected on
 *        first render
 *
 * @returns {object}
 */
function useTabUtils<TabValueT>(
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

export default useTabUtils;
