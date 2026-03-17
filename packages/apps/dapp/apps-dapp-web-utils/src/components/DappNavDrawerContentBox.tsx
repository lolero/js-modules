import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';

export const DappNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(routesMetadataPrivate);

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
