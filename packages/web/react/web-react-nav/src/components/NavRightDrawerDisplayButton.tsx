import {
  faAnglesLeft,
  faAnglesRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { MuiFaIcon } from '@js-modules/web-react-components';
import {
  Box,
  Fab,
  IconButton,
  svgIconClasses,
  Theme,
  Tooltip,
} from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

export const NavRightDrawerDisplayButton: React.FunctionComponent = () => {
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
      } as const),
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
};
