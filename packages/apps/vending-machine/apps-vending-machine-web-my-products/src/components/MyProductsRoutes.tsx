import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesMyProducts,
} from '@js-modules/apps-vending-machine-common-constants';
import { MyProductsWorkspaceBox } from './MyProductsWorkspaceBox';
import { MyProductsCreateNewWorkspaceBox } from './MyProductsCreateNewWorkspaceBox';
import { MyProductsEditWorkspaceBox } from './MyProductsEditWorkspaceBox';

export const MyProductsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<MyProductsWorkspaceBox />} />
      <Route
        path={`${SubModulesMyProducts.createNew}`}
        element={<MyProductsCreateNewWorkspaceBox />}
      />
      <Route
        path={`${SubModulesMyProducts.edit}/:nodeProductId`}
        element={<MyProductsEditWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={myModulesRoutesMetadata[MyModules.myProducts].path}
          />
        }
      />
    </Routes>
  );
};
