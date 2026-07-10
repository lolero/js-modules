import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { SettingsProfileRoutes } from './SettingsProfileRoutes';
import { SettingsWorkspace } from './SettingsWorkspace';

export function SettingsRoutes(): React.ReactNode {
  return (
    <Routes>
      <Route index element={<SettingsWorkspace />} />
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
}
