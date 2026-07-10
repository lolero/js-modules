import Box from '@mui/material/Box';
import type React from 'react';
import { useStateAuthReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';

export function SettingsWorkspaceContentBox(): React.ReactNode {
  const { tokens } = useStateAuthReducerMetadata();
  return (
    <Box>
      <Box>SettingsWorkspaceContentBox</Box>
      <Box
        sx={{
          width: '400px',
          overflow: 'auto',
          whiteSpace: 'wrap',
          overflowWrap: 'break-word',
        }}
      >
        Access token: {tokens?.access.token}
      </Box>
    </Box>
  );
}
