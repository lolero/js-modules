import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

export const MyProductsCreateNewWorkspaceTopToolbar: React.FC = () => {
  const navigate = useNavigate();
  const goBackCallback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Box>
      <Tooltip title="Go back">
        <IconButton size="small" onClick={goBackCallback}>
          <MuiFaIcon icon={faChevronLeft} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
