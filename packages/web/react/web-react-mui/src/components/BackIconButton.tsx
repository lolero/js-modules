import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import Box from '@mui/material/Box';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import type React from 'react';
import { MuiFaIcon } from './MuiFaIcon';

export type BackIconButtonProps = IconButtonProps & {
  icon?: IconDefinition;
};

/**
 * Back-arrow icon button. Navigation is injected by the consumer via `onClick`
 * (e.g. react-router `() => navigate(-1)` or Next.js `() => router.back()`),
 * keeping the component router-agnostic.
 * @param props - Component props.
 * @param props.icon - Optional icon override (defaults to a left angle).
 * @param props.edge - MUI `IconButton` edge (defaults to `start`).
 * @returns Back icon button.
 */
export const BackIconButton: React.FC<BackIconButtonProps> = ({
  icon,
  edge,
  ...iconButtonProps
}) => {
  return (
    <Box>
      <IconButton edge={edge ?? 'start'} {...iconButtonProps}>
        <MuiFaIcon icon={icon ?? faAngleLeft} />
      </IconButton>
    </Box>
  );
};
