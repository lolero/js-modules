import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesFeeds,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { FeedsWorkspaceBox } from './FeedsWorkspaceBox';

export const FeedsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<FeedsWorkspaceBox />} />
      <Route
        path={`${WebSubModulesFeeds.general}`}
        element={<FeedsWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataPrivate[WebModulesPrivate.feeds].path}
          />
        }
      />
    </Routes>
  );
};
