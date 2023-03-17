import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useNavLeftDrawerTabs } from '@js-modules/web-react-nav';
import { myModulesRoutesMetadata } from '@js-modules/apps-vending-machine-common-constants';
import { useStateAuthReducerMetadata } from '@js-modules/apps-vending-machine-common-store-redux';

export const MyWorkspaceNavDrawerContentBox: React.FunctionComponent = () => {
  const { tokens } = useStateAuthReducerMetadata();
  const userRoles = tokens?.access.metadata.realm_access?.roles ?? [];
  const { tabsValue, tabs } = useNavLeftDrawerTabs(
    myModulesRoutesMetadata,
    userRoles,
  );

  return (
    <Tabs orientation="vertical" variant="scrollable" value={tabsValue}>
      {tabs}
    </Tabs>
  );
};
