import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  AUTH_BASE_URI,
  MyModules,
  myModulesRoutesMetadata,
  PublicModules,
  publicModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';
import {
  useStateAuthInitializeKeycloak,
  useStateDialogsReducerMetadata,
} from '@js-modules/apps-vending-machine-common-store-redux';
import { KeycloakConfig } from 'keycloak-js';
import { HomeWorkspaceBox } from '@js-modules/apps-vending-machine-web-site';
import { StoreWorkspaceBox } from '@js-modules/apps-vending-machine-web-store';
import { MyProductsRoutes } from '@js-modules/apps-vending-machine-web-my-products';
import { ShoppingCartWorkspaceBox } from '@js-modules/apps-vending-machine-web-shopping-cart';
import { ConfirmDialog } from '@js-modules/web-react-components';

const keycloakConfig: KeycloakConfig = {
  url: AUTH_BASE_URI,
  realm: 'vending-machine',
  clientId: 'client-web',
};

export const VendingMachineRoutes: React.FunctionComponent = () => {
  const {
    reducerMetadata: { isKeycloakReady, isAuthenticated },
    callback: initializeKeycloakCallback,
  } = useStateAuthInitializeKeycloak(keycloakConfig);

  const { confirmDialogMetadata } = useStateDialogsReducerMetadata();

  useEffect(() => {
    initializeKeycloakCallback();
  }, [initializeKeycloakCallback]);

  if (!isKeycloakReady) {
    return <CircularProgress />;
  }

  const rootPath = !isAuthenticated
    ? publicModulesRoutesMetadata[PublicModules.home].path
    : myModulesRoutesMetadata[MyModules.store].path;

  return (
    <>
      <Routes>
        <Route path={`${PublicModules.home}`} element={<HomeWorkspaceBox />} />
        <Route path={`${MyModules.store}/*`} element={<StoreWorkspaceBox />} />
        <Route
          path={`${MyModules.myProducts}/*`}
          element={<MyProductsRoutes />}
        />
        <Route
          path={`${MyModules.shoppingCart}/*`}
          element={<ShoppingCartWorkspaceBox />}
        />
        <Route path="*" element={<Navigate replace to={rootPath} />} />
      </Routes>
      {!!confirmDialogMetadata && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ConfirmDialog {...confirmDialogMetadata} />
      )}
    </>
  );
};
