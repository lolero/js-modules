import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-vending-machine-web-my-workspace';
import {
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';
import { MyProductsWorkspaceTopToolbar } from './MyProductsWorkspaceTopToolbar';
import { MyProductsWorkspaceContentBox } from './MyProductsWorkspaceContentBox';

export const MyProductsWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={MyModules.myProducts}
      roles={myModulesRoutesMetadata[MyModules.myProducts].roles}
      workspaceTopToolbar={<MyProductsWorkspaceTopToolbar />}
      workspaceContent={<MyProductsWorkspaceContentBox />}
    />
  );
};
