import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';

export const PublicWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const { tabsValue, tabs } = useNavLeftDrawerTabs(routesMetadataPublic);

    return (
      <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
        {tabs}
      </Tabs>
    );
  };
