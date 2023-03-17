import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-vending-machine-web-my-workspace';
import {
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';
import { StoreWorkspaceTopToolbar } from './StoreWorkspaceTopToolbar';
import { StoreWorkspaceContentBox } from './StoreWorkspaceContentBox';

export const StoreWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={MyModules.store}
      roles={myModulesRoutesMetadata[MyModules.store].roles}
      workspaceTopToolbar={<StoreWorkspaceTopToolbar />}
      workspaceContent={<StoreWorkspaceContentBox />}
    />
  );
};
