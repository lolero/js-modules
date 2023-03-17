import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-vending-machine-web-my-workspace';
import {
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';
import { ShoppingCartWorkspaceTopToolbar } from './ShoppingCartWorkspaceTopToolbar';
import { ShoppingCartWorkspaceContentBox } from './ShoppingCartWorkspaceContentBox';

export const ShoppingCartWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={MyModules.shoppingCart}
      roles={myModulesRoutesMetadata[MyModules.shoppingCart].roles}
      workspaceTopToolbar={<ShoppingCartWorkspaceTopToolbar />}
      workspaceContent={<ShoppingCartWorkspaceContentBox />}
    />
  );
};
