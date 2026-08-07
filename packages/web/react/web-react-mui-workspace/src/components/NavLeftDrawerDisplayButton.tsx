import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
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
 * Floating toggle for the left nav drawer — expands, collapses, hides, or
 * shows it depending on the current drawer display state and viewport.
 * @returns The left-drawer toggle control.
 */
export function NavLeftDrawerDisplayButton(): React.ReactNode {
  const { showNavLeftDrawerString, hideNavLeftDrawerString } =
    useContext(NavContext);

  const { navTopToolbarHeight } = useContext(WorkspaceContext);

  const { workspaceMarginLeft } = useContext(WorkspaceContext);

  const {
    isMobile,
    isNavLeftDrawerExpanded,
    isNavLeftDrawerCollapsed,
    collapseNavLeftDrawerCallback,
    expandNavLeftDrawerCallback,
    hideNavLeftDrawerCallback,
  } = useNavDisplayMetadata();

  const theme = useTheme();

  const fabSx = {
    boxShadow: 'none',
    minHeight: '20px',
    height: '20px',
    width: '20px',
    position: 'absolute',
    left: `calc(${workspaceMarginLeft} - 10px)`,
    [cssSelectorSvgIconRoot]: {
      height: '14px',
    },
    '&:active': {
      boxShadow: 'none',
    },
  } as const;

  if (isNavLeftDrawerCollapsed) {
    return (
      <Tooltip title={showNavLeftDrawerString}>
        <Fab sx={fabSx} color="primary" onClick={expandNavLeftDrawerCallback}>
          <MuiFaIcon icon={faAnglesRight} />
        </Fab>
      </Tooltip>
    );
  }

  if (isNavLeftDrawerExpanded && !isMobile) {
    return (
      <Tooltip title={hideNavLeftDrawerString}>
        <Fab sx={fabSx} color="primary" onClick={collapseNavLeftDrawerCallback}>
          <MuiFaIcon icon={faAnglesLeft} />
        </Fab>
      </Tooltip>
    );
  }

  if (isNavLeftDrawerExpanded && isMobile) {
    return (
      <Tooltip title={hideNavLeftDrawerString}>
        <IconButton
          sx={{
            position: 'absolute',
            top: `calc(${navTopToolbarHeight}px + ${theme.spacing(1)})`,
            right: theme.spacing(1),
          }}
          onClick={hideNavLeftDrawerCallback}
        >
          <MuiFaIcon icon={faXmark} />
        </IconButton>
      </Tooltip>
    );
  }

  return <Box sx={fabSx} />;
}
