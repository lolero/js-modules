import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-vending-machine-web-my-workspace';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesMyProducts,
} from '@js-modules/apps-vending-machine-common-constants';
import { useParams } from 'react-router-dom';
import { MyProductsEditWorkspaceTopToolbar } from './MyProductsEditWorkspaceTopToolbar';
import { MyProductsEditWorkspaceContentBox } from './MyProductsEditWorkspaceContentBox';

export const MyProductsEditWorkspaceBox: React.FC = () => {
  const { nodeProductId } = useParams();

  return (
    <MyWorkspaceBox
      title={SubModulesMyProducts.edit}
      roles={
        myModulesRoutesMetadata[MyModules.myProducts].subRoutes![
          SubModulesMyProducts.edit
        ].roles
      }
      workspaceTopToolbar={<MyProductsEditWorkspaceTopToolbar />}
      workspaceContent={
        <MyProductsEditWorkspaceContentBox nodeProductPk={nodeProductId!} />
      }
    />
  );
};
