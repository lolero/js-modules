import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { myModulesRoutesMetadata } from '@js-modules/apps-travel-log-common-constants';

export const MyWorkspaceNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(myModulesRoutesMetadata);

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
