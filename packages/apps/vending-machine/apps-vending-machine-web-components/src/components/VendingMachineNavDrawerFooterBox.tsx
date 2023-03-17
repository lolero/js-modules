import React from 'react';
import Box from '@mui/material/Box';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { VendingMachineNavSocialMediaBox } from './VendingMachineNavSocialMediaBox';
import { VendingMachineNavSocialMediaMenu } from './VendingMachineNavSocialMediaMenu';

export const VendingMachineNavDrawerFooterBox: React.FunctionComponent = () => {
  const { isNavLeftDrawerCollapsed, isNavLeftDrawerExpanded } =
    useNavDisplayMetadata();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isNavLeftDrawerExpanded && <VendingMachineNavSocialMediaBox />}
      {isNavLeftDrawerCollapsed && <VendingMachineNavSocialMediaMenu />}
    </Box>
  );
};
