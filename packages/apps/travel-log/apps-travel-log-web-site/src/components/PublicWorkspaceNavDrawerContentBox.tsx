import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { modulesPublicRoutesMetadata } from '@js-modules/apps-travel-log-common-constants';

export const PublicWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const { tabsValue, tabs } = useNavLeftDrawerTabs(
      modulesPublicRoutesMetadata,
    );

    return (
      <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
        {tabs}
      </Tabs>
    );
  };
