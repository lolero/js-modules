import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { dappRoutesMetadata } from '@js-modules/apps-dapp-common-constants';

export const DappNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(dappRoutesMetadata);

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
