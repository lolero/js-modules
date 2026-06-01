import Tabs from '@mui/material/Tabs';
import type React from 'react';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { routesMetadataMui } from '../routesMetadata/routesMetadata';

export function DocsMuiNavDrawerContentBox(): React.ReactNode {
  const { tabsValue, tabs } = useNavLeftDrawerTabs(routesMetadataMui);
  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
}
