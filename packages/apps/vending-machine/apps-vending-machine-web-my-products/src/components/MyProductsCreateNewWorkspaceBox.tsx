import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-vending-machine-web-my-workspace';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesMyProducts,
} from '@js-modules/apps-vending-machine-common-constants';
import { MyProductsCreateNewWorkspaceTopToolbar } from './MyProductsCreateNewWorkspaceTopToolbar';
import { MyProductsCreateNewWorkspaceContentBox } from './MyProductsCreateNewWorkspaceContentBox';

export const MyProductsCreateNewWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={SubModulesMyProducts.createNew}
      roles={
        myModulesRoutesMetadata[MyModules.myProducts].subRoutes![
          SubModulesMyProducts.createNew
        ].roles
      }
      workspaceTopToolbar={<MyProductsCreateNewWorkspaceTopToolbar />}
      workspaceContent={<MyProductsCreateNewWorkspaceContentBox />}
    />
  );
};
