import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import Box from '@mui/material/Box';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import type React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MuiFaIcon } from './MuiFaIcon';

export type BackIconButtonProps = IconButtonProps & {
  icon?: IconDefinition;
};

export const BackIconButton: React.FC<BackIconButtonProps> = (props) => {
  const { icon, edge, onClick, ...iconButtonProps } = props;

  const navigate = useNavigate();

  const goBackCallback = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(e);
        return;
      }
      void navigate(-1);
    },
    [navigate, onClick],
  );

  return (
    <Box>
      <IconButton
        edge={edge ?? 'start'}
        onClick={goBackCallback}
        {...iconButtonProps}
      >
        <MuiFaIcon icon={icon ?? faAngleLeft} />
      </IconButton>
    </Box>
  );
};
