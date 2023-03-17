import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { publicModulesRoutesMetadata } from '@js-modules/apps-vending-machine-common-constants';

export const PublicWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const { tabsValue, tabs } = useNavLeftDrawerTabs(
      publicModulesRoutesMetadata,
    );

    return (
      <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
        {tabs}
      </Tabs>
    );
  };
