import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  MyModules,
  PublicModules,
} from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsRoutes } from '@js-modules/apps-travel-log-web-my-feeds';
import {
  HomeWorkspaceBox,
  PurposeWorkspaceBox,
} from '@js-modules/apps-travel-log-web-site';
import { useStateAuthReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';

export const TravelLogRoutes: React.FunctionComponent = () => {
  const { isKeycloakReady, isAuthenticated } = useStateAuthReducerMetadata();

  if (!isKeycloakReady) {
    // TODO: create loading workspace with skeletons instead of this ugly
    //  circular loader
    return <CircularProgress />;
  }

  const rootPath = !isAuthenticated
    ? `/${PublicModules.home}`
    : `/${MyModules.myFeeds}`;

  return (
    <Routes>
      <Route path={`${PublicModules.home}`} element={<HomeWorkspaceBox />} />
      <Route
        path={`${PublicModules.purpose}`}
        element={<PurposeWorkspaceBox />}
      />
      <Route path={`${MyModules.myFeeds}/*`} element={<MyFeedsRoutes />} />
      <Route path={`${MyModules.myBoards}/*`} element={<MyFeedsRoutes />} />
      <Route path={`${MyModules.myLog}/*`} element={<MyFeedsRoutes />} />
      <Route path={`${MyModules.myNetwork}/*`} element={<MyFeedsRoutes />} />
      <Route path="*" element={<Navigate replace to={rootPath} />} />
    </Routes>
  );
};
