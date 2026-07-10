import Box from '@mui/material/Box';
import type React from 'react';
import { BackIconButton } from '@js-modules/web-react-mui';
import { useWebRouter } from '@js-modules/web-react-router';

export function SettingsProfileEditWorkspaceTopToolbar(): React.ReactNode {
  const { back } = useWebRouter();

  return (
    <Box>
      <BackIconButton onClick={back} />
    </Box>
  );
}
