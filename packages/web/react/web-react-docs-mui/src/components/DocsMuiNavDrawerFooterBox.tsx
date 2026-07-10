import Box from '@mui/material/Box';
import type React from 'react';
import { useNavDisplayMetadata } from '@js-modules/web-react-mui-workspace';
import { DocsMuiNavSocialMediaBox } from './DocsMuiNavSocialMediaBox';
import { DocsMuiNavSocialMediaMenu } from './DocsMuiNavSocialMediaMenu';

export function DocsMuiNavDrawerFooterBox(): React.ReactNode {
  const { isNavLeftDrawerCollapsed, isNavLeftDrawerExpanded } =
    useNavDisplayMetadata();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isNavLeftDrawerExpanded && <DocsMuiNavSocialMediaBox />}
      {isNavLeftDrawerCollapsed && <DocsMuiNavSocialMediaMenu />}
    </Box>
  );
}
