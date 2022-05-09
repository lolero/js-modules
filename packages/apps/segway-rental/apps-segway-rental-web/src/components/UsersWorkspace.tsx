import React from 'react';
import MainWorkspaceBox from './MainWorkspaceBox';
import UsersWorkspaceBox from './UsersWorkspaceBox';

const UsersWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspaceBox>
      {{
        content: <UsersWorkspaceBox />,
      }}
    </MainWorkspaceBox>
  );
};

export const UsersWorkspaceRaw = UsersWorkspace;
export const UsersWorkspaceMemo = React.memo(UsersWorkspaceRaw);
export default UsersWorkspaceMemo;
