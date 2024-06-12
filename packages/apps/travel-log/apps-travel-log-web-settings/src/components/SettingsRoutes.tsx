import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import { SettingsWorkspaceBox } from './SettingsWorkspaceBox';
import { SettingsProfileRoutes } from './SettingsProfileRoutes';

export const SettingsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<SettingsWorkspaceBox />} />
      <Route
        path={`${WebSubModulesSettings.profile}/*`}
        element={<SettingsProfileRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataPrivate[WebModulesPrivate.settings].path}
          />
        }
      />
    </Routes>
  );
};
