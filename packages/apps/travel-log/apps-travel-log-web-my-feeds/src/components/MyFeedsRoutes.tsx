import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesMyFeeds,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import { MyFeedsWorkspaceBox } from './MyFeedsWorkspaceBox';

export const MyFeedsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<MyFeedsWorkspaceBox />} />
      <Route
        path={`${WebSubModulesMyFeeds.general}`}
        element={<MyFeedsWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataPrivate[WebModulesPrivate.myFeeds].path}
          />
        }
      />
    </Routes>
  );
};
