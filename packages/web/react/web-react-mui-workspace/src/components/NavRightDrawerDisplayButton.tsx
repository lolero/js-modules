import {
  faAnglesLeft,
  faAnglesRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import type { Theme } from '@mui/material';
import { Box, Fab, IconButton, svgIconClasses, Tooltip } from '@mui/material';
import type React from 'react';
import { useContext, useMemo } from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

/**
 * Floating toggle for the right nav drawer — expands, collapses, hides, or
 * shows it depending on the current drawer display state and viewport.
 * @returns The right-drawer toggle control.
 */
export function NavRightDrawerDisplayButton(): React.ReactNode {
  const { showNavRightDrawerString, hideNavRightDrawerString } =
    useContext(NavContext);

  const { navTopToolbarHeight } = useContext(WorkspaceContext);

  const { workspaceMarginRight } = useContext(WorkspaceContext);

  const {
    isMobile,
    isNavRightDrawerExpanded,
    isNavRightDrawerCollapsed,
    collapseNavRightDrawerCallback,
    expandNavRightDrawerCallback,
    hideNavRightDrawerCallback,
  } = useNavDisplayMetadata();

  const fabSx = useMemo(
    () =>
      ({
        boxShadow: 'none',
        minHeight: '20px',
        height: '20px',
        width: '20px',
        position: 'absolute',
        top: (t: Theme) => `calc(${navTopToolbarHeight}px + ${t.spacing(1)})`,
        right: `calc(${workspaceMarginRight} - 10px)`,
        zIndex: 1301,
        [`& .${svgIconClasses.root}`]: {
          height: '14px',
        },
        '&:active': {
          boxShadow: 'none',
        },
      }) as const,
    [navTopToolbarHeight, workspaceMarginRight],
  );

  if (isNavRightDrawerCollapsed) {
    return (
      <Tooltip title={showNavRightDrawerString}>
        <Fab sx={fabSx} color="primary" onClick={expandNavRightDrawerCallback}>
          <MuiFaIcon icon={faAnglesLeft} />
        </Fab>
      </Tooltip>
    );
  }

  if (isNavRightDrawerExpanded && !isMobile) {
    return (
      <Tooltip title={hideNavRightDrawerString}>
        <Fab
          sx={fabSx}
          color="primary"
          onClick={collapseNavRightDrawerCallback}
        >
          <MuiFaIcon icon={faAnglesRight} />
        </Fab>
      </Tooltip>
    );
  }

  if (isNavRightDrawerExpanded && isMobile) {
    return (
      <Tooltip title={hideNavRightDrawerString}>
        <IconButton
          sx={{
            position: 'absolute',
            top: (t) => `calc(${navTopToolbarHeight}px + ${t.spacing(1)})`,
            right: (t) => t.spacing(1),
          }}
          onClick={hideNavRightDrawerCallback}
        >
          <MuiFaIcon icon={faXmark} />
        </IconButton>
      </Tooltip>
    );
  }

  return <Box sx={fabSx} />;
}
