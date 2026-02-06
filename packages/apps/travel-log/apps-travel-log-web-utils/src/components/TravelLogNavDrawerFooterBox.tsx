import React from 'react';
import Box from '@mui/material/Box';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { TravelLogNavSocialMediaBox } from './TravelLogNavSocialMediaBox';
import { TravelLogNavSocialMediaMenu } from './TravelLogNavSocialMediaMenu';

export const TravelLogNavDrawerFooterBox: React.FunctionComponent = () => {
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
};
