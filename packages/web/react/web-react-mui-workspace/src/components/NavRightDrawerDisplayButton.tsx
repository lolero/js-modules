import {
  faAnglesLeft,
  faAnglesRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Fab, IconButton, svgIconClasses, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type React from 'react';
import { useContext } from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

// WATCH: react-compiler-computed-keys
// Hoisted so the key position holds a plain identifier.
const cssSelectorSvgIconRoot = `& .${svgIconClasses.root}`;

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

  const theme = useTheme();

  const fabSx = {
    boxShadow: 'none',
    minHeight: '20px',
    height: '20px',
    width: '20px',
    position: 'absolute',
    top: `calc(${navTopToolbarHeight}px + ${theme.spacing(1)})`,
    right: `calc(${workspaceMarginRight} - 10px)`,
    zIndex: 1301,
    [cssSelectorSvgIconRoot]: {
      height: '14px',
    },
    '&:active': {
      boxShadow: 'none',
    },
  } as const;

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
            top: `calc(${navTopToolbarHeight}px + ${theme.spacing(1)})`,
            right: theme.spacing(1),
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
