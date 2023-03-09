import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { myWorkspaceNavDrawerTabsMetadata } from '../constants/myWorkspace.constants';

export const MyWorkspaceNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(
    myWorkspaceNavDrawerTabsMetadata,
  );

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
