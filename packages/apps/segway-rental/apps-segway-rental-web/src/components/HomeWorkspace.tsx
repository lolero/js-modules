import React from 'react';
import MainWorkspaceBox from './MainWorkspaceBox';
import HomeWorkspaceBox from './HomeWorkspaceBox';

const HomeWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspaceBox>
      {{
        content: <HomeWorkspaceBox />,
      }}
    </MainWorkspaceBox>
  );
};

export const HomeWorkspaceRaw = HomeWorkspace;
export const HomeWorkspaceMemo = React.memo(HomeWorkspaceRaw);
export default HomeWorkspaceMemo;
