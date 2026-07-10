import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesFeeds,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { FeedsWorkspace } from './FeedsWorkspace';

export function FeedsRoutes(): React.ReactNode {
  return (
    <Routes>
      <Route index element={<FeedsWorkspace />} />
      <Route
        path={`${WebSubModulesFeeds.general}`}
        element={<FeedsWorkspace />}
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
}
