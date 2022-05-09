import React from 'react';
import MainWorkspaceBox from './MainWorkspaceBox';
import ReservationsWorkspaceBox from './ReservationsWorkspaceBox';

const ReservationsWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspaceBox>
      {{
        content: <ReservationsWorkspaceBox />,
      }}
    </MainWorkspaceBox>
  );
};

export const ReservationsWorkspaceRaw = ReservationsWorkspace;
export const ReservationsWorkspaceMemo = React.memo(ReservationsWorkspaceRaw);
export default ReservationsWorkspaceMemo;
