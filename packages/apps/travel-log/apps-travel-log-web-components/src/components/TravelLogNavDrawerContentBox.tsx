import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { travelLogNavDrawerTabsMetadata } from '../constants/travelLogNavTabs.constants';

export const TravelLogNavDrawerContentBox: React.FunctionComponent = () => {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(
    travelLogNavDrawerTabsMetadata,
  );

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
