import Tabs from '@mui/material/Tabs';
import type React from 'react';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';

export const PublicWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const { tabsValue, tabs } = useNavLeftDrawerTabs(routesMetadataPublic);

    return (
      <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
        {tabs}
      </Tabs>
    );
  };
