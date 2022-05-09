import React from 'react';
import MainWorkspaceBox from './MainWorkspaceBox';
import SegwaysAdminWorkspaceBox from './SegwaysWorkspaceBox';

const SegwaysWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspaceBox>
      {{
        content: <SegwaysAdminWorkspaceBox />,
      }}
    </MainWorkspaceBox>
  );
};

export const SegwaysWorkspaceRaw = SegwaysWorkspace;
export const SegwaysWorkspaceMemo = React.memo(SegwaysWorkspaceRaw);
export default SegwaysWorkspaceMemo;
