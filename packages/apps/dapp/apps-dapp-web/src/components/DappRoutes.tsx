import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useNodeChainsGetMany } from '@js-modules/apps-dapp-common-store-redux';
import { WebModules } from '@js-modules/apps-dapp-common-constants';
import { WebPortfolioRoutes } from '@js-modules/apps-dapp-web-portfolio';
import { WebAnalyticsRoutes } from '@js-modules/apps-dapp-web-analytics';
import { routesMetadataDapp } from '@js-modules/apps-dapp-web-components';

export const DappRoutes: React.FunctionComponent = () => {
  const {
    request: nodeChainsGetManyRequest,
    callback: nodeChainsGetManyCallback,
  } = useNodeChainsGetMany();

  useEffect(() => {
    if (!nodeChainsGetManyRequest) {
      nodeChainsGetManyCallback();
    }
  }, [nodeChainsGetManyCallback, nodeChainsGetManyRequest]);

  return (
    <Routes>
      <Route
        path={`${WebModules.portfolio}/*`}
        element={<WebPortfolioRoutes />}
      />
      <Route
        path={`${WebModules.analytics}/*`}
        element={<WebAnalyticsRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataDapp[WebModules.portfolio].path}
          />
        }
      />
    </Routes>
  );
};
