import React, { useContext, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { svgIconClasses } from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { NavContext } from '../contexts/NavContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

export const NavLeftDrawerDisplayButton: React.FunctionComponent = () => {
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

  const fabSx = useMemo(
    () =>
      ({
        boxShadow: 'none',
        minHeight: '20px',
        height: '20px',
        width: '20px',
        position: 'absolute',
        left: `calc(${workspaceMarginLeft} - 10px)`,
        [`& .${svgIconClasses.root}`]: {
          height: '14px',
        },
        '&:active': {
          boxShadow: 'none',
        },
      } as const),
    [workspaceMarginLeft],
  );

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
            top: (t) => `calc(${navTopToolbarHeight}px + ${t.spacing(1)})`,
            right: (t) => t.spacing(1),
          }}
          onClick={hideNavLeftDrawerCallback}
        >
          <MuiFaIcon icon={faXmark} />
        </IconButton>
      </Tooltip>
    );
  }

  return <Box sx={fabSx} />;
};
