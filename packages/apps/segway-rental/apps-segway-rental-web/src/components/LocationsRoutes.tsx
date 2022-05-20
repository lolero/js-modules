import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WorkspaceBox } from '@js-modules/web-react-nav';
import { Modules, SubModulesLocations } from '../types/segwayRentalWebTypes';

const LocationsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route
        path={`${SubModulesLocations.europe}`}
        element={
          <WorkspaceBox topToolbar={} workspaceToolbar={} workspaceContent={} />
        }
      />
      <Route
        path={`${SubModulesLocations.america}`}
        element={
          <WorkspaceBox topToolbar={} workspaceToolbar={} workspaceContent={} />
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to={`/${Modules.locations}/${SubModulesLocations.europe}`}
            replace
          />
        }
      />
    </Routes>
  );
};

export default LocationsRoutes;
