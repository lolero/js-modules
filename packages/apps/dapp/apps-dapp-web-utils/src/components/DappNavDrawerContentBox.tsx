import Tabs from '@mui/material/Tabs';
import type React from 'react';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';

export const DappNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(routesMetadataPrivate);

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
