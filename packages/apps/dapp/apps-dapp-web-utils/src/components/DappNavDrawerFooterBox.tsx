import Box from '@mui/material/Box';
import type React from 'react';
import { useNavDisplayMetadata } from '@js-modules/web-react-mui-workspace';
import { DappNavSocialMediaBox } from './DappNavSocialMediaBox';
import { DappNavSocialMediaMenu } from './DappNavSocialMediaMenu';

export function DappNavDrawerFooterBox(): React.ReactNode {
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
}
