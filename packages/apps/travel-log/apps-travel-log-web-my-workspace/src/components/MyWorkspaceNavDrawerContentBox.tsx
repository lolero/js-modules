import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { modulesPrivateRoutesMetadata } from '@js-modules/apps-travel-log-common-constants';

export const MyWorkspaceNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(
    modulesPrivateRoutesMetadata,
  );

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
