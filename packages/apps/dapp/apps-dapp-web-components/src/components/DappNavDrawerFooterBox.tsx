import React from 'react';
import Box from '@mui/material/Box';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { DappNavSocialMediaBox } from './DappNavSocialMediaBox';
import { DappNavSocialMediaMenu } from './DappNavSocialMediaMenu';

export const DappNavDrawerFooterBox: React.FunctionComponent = () => {
  const { isNavLeftDrawerCollapsed, isNavLeftDrawerExpanded } =
    useNavDisplayMetadata();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isNavLeftDrawerExpanded && <DappNavSocialMediaBox />}
      {isNavLeftDrawerCollapsed && <DappNavSocialMediaMenu />}
    </Box>
  );
};
