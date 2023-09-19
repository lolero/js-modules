import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
  WebSubModulesMyFeeds,
} from '@js-modules/apps-travel-log-common-constants';
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
            to={modulesPrivateRoutesMetadata[WebModulesPrivate.myFeeds].path}
          />
        }
      />
    </Routes>
  );
};
