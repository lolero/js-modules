import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
      navigate(-1);
    },
    [navigate, onClick],
  );

  return (
    <Box>
      <IconButton
        edge={edge ?? 'start'}
        onClick={goBackCallback}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...iconButtonProps}
      >
        <MuiFaIcon icon={icon ?? faAngleLeft} />
      </IconButton>
    </Box>
  );
};
