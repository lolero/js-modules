import Box from '@mui/material/Box';
import type React from 'react';
import { PrivateWorkspaceAccountMenu } from './PrivateWorkspaceAccountMenu';
import { PrivateWorkspaceNotificationsMenu } from './PrivateWorkspaceNotificationsMenu';

export function PrivateWorkspaceNavToolbarActionsBox(): React.ReactNode {
  return (
    <Box>
      <PrivateWorkspaceNotificationsMenu />
      <PrivateWorkspaceAccountMenu />
    </Box>
  );
}
