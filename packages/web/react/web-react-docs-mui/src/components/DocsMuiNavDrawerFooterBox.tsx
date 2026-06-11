import Box from '@mui/material/Box';
import type React from 'react';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { DocsMuiNavSocialMediaBox } from './DocsMuiNavSocialMediaBox';
import { DocsMuiNavSocialMediaMenu } from './DocsMuiNavSocialMediaMenu';

export const DocsMuiNavDrawerFooterBox: React.FunctionComponent = () => {
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
};
