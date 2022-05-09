import React from 'react';
import MainWorkspaceBox from './MainWorkspaceBox';
import LocationsWorkspaceBox from './LocationsWorkspaceBox';

const LocationsWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspaceBox>
      {{
        content: <LocationsWorkspaceBox />,
      }}
    </MainWorkspaceBox>
  );
};

export const LocationsWorkspaceRaw = LocationsWorkspace;
export const LocationsWorkspaceMemo = React.memo(LocationsWorkspaceRaw);
export default LocationsWorkspaceMemo;
