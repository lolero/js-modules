import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';

export const PrivateWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const { tabsValue, tabs } = useNavLeftDrawerTabs(routesMetadataPrivate);

    return (
      <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
        {tabs}
      </Tabs>
    );
  };
