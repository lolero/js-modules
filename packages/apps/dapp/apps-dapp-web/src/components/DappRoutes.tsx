import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WebModulesPrivate } from '@js-modules/apps-dapp-common-constants';
import { useNodeChainsGetMany } from '@js-modules/apps-dapp-common-store-redux';
import { WebPortfolioRoutes } from '@js-modules/apps-dapp-web-module-private-portfolio';
import { WebAnalyticsRoutes } from '@js-modules/apps-dapp-web-module-private-analytics';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';

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
        path={`${WebModulesPrivate.portfolio}/*`}
        element={<WebPortfolioRoutes />}
      />
      <Route
        path={`${WebModulesPrivate.analytics}/*`}
        element={<WebAnalyticsRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataPrivate[WebModulesPrivate.portfolio].path}
          />
        }
      />
    </Routes>
  );
};
