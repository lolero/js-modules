import Box from '@mui/material/Box';
import type React from 'react';
import { useNavDisplayMetadata } from '@js-modules/web-react-mui-workspace';
import { TravelLogNavSocialMediaBox } from './TravelLogNavSocialMediaBox';
import { TravelLogNavSocialMediaMenu } from './TravelLogNavSocialMediaMenu';

export function TravelLogNavDrawerFooterBox(): React.ReactNode {
  const { isNavLeftDrawerCollapsed, isNavLeftDrawerExpanded } =
    useNavDisplayMetadata();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isNavLeftDrawerExpanded && <TravelLogNavSocialMediaBox />}
      {isNavLeftDrawerCollapsed && <TravelLogNavSocialMediaMenu />}
    </Box>
  );
}
