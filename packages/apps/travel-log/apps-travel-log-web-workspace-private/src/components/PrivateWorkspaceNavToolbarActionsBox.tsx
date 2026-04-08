import Box from '@mui/material/Box';
import type React from 'react';
import { PrivateWorkspaceAccountMenu } from './PrivateWorkspaceAccountMenu';
import { PrivateWorkspaceNotificationsMenu } from './PrivateWorkspaceNotificationsMenu';

export const PrivateWorkspaceNavToolbarActionsBox: React.FC = () => {
  return (
    <Box>
      <PrivateWorkspaceNotificationsMenu />
      <PrivateWorkspaceAccountMenu />
    </Box>
  );
};
