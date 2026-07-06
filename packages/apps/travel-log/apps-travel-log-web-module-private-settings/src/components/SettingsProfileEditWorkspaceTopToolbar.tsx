import Box from '@mui/material/Box';
import type React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackIconButton } from '@js-modules/web-react-mui';

export const SettingsProfileEditWorkspaceTopToolbar: React.FC = () => {
  const navigate = useNavigate();

  const navigateBackCallback = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  return (
    <Box>
      <BackIconButton onClick={navigateBackCallback} />
    </Box>
  );
};
