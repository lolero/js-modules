import React from 'react';
import Box from '@mui/material/Box';
import { PrivateWorkspaceNotificationsMenu } from './PrivateWorkspaceNotificationsMenu';
import { PrivateWorkspaceAccountMenu } from './PrivateWorkspaceAccountMenu';

export const PrivateWorkspaceNavToolbarActionsBox: React.FC = () => {
  return (
    <Box>
      <PrivateWorkspaceNotificationsMenu />
      <PrivateWorkspaceAccountMenu />
    </Box>
  );
};
