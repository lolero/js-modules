import React from 'react';
import TokensWorkspaceBox from './TokensWorkspaceBox';
import MainWorkspace from './MainWorkspace';

const TokensWorkspace: React.FunctionComponent = () => {
  return (
    <MainWorkspace>
      {{
        content: <TokensWorkspaceBox />,
      }}
    </MainWorkspace>
  );
};

export default TokensWorkspace;
