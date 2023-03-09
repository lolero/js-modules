import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  MyModules,
  myModulesPaths,
  SubModulesMyFeeds,
} from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsWorkspaceBox } from './MyFeedsWorkspaceBox';

export const MyFeedsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<MyFeedsWorkspaceBox />} />
      <Route
        path={`${SubModulesMyFeeds.general}`}
        element={<MyFeedsWorkspaceBox />}
      />
      <Route
        path="*"
        element={<Navigate replace to={myModulesPaths[MyModules.myFeeds]} />}
      />
    </Routes>
  );
};
