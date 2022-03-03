import React from 'react';
import HomeWorkspaceBox from './HomeWorkspaceBox';
import MainWorkspace from './MainWorkspace';

const HomeWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspace>
      {{
        content: <HomeWorkspaceBox />,
      }}
    </MainWorkspace>
  );
};

export default HomeWorkspace;
