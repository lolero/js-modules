import React, { forwardRef, useCallback, useContext, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { NavSideDrawerDisplayStatus } from '../contexts/NavSideDrawerDisplayStatusContext';
import {
  WorkspaceBoxContext,
  ScrollDirection,
} from '../contexts/WorkspaceBoxContext';
import useNavDisplayMetadata from '../hooks/useNavDisplayMetadata';
import {
  NAV_DRAWER_WIDTH_COLLAPSED_SPACING,
  NAV_DRAWER_WIDTH_EXPANDED_SPACING,
  WORKSPACE_PADDING_X_SPACING,
} from '../constants/navConstants';

type Props = {
  shortLogo: React.ReactNode;
  longLogo: React.ReactNode;
  homePath: string;
  topToolbar: React.ReactNode;
};

const NavTopBar = forwardRef<HTMLDivElement, Props>(
  ({ shortLogo, longLogo, homePath, topToolbar }, ref) => {
    const { navBarHeight, navSideDrawerDisplayStatus, contentScrollDirection } =
      useContext(WorkspaceBoxContext);

    const theme = useTheme();

    const {
      isMobile,
      isDesktop,
      isNavDrawerHidden,
      isNavDrawerCollapsed,
      expandNavDrawerCallback,
      hideNavDrawerCallback,
    } = useNavDisplayMetadata();

    const toggleNavDrawerCallback = useCallback(() => {
      if (isNavDrawerHidden) {
        expandNavDrawerCallback();
      } else {
        hideNavDrawerCallback();
      }
    }, [expandNavDrawerCallback, hideNavDrawerCallback, isNavDrawerHidden]);

    const appbarDisplay = useMemo(() => {
      if (isMobile && contentScrollDirection === ScrollDirection.down) {
        return 'none';
      }

      return 'flex';
    }, [contentScrollDirection, isMobile]);

    const logoBoxWidth = useMemo(() => {
      if (!isDesktop || isNavDrawerCollapsed) {
        return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
      }

      return theme.spacing(NAV_DRAWER_WIDTH_EXPANDED_SPACING);
    }, [isDesktop, isNavDrawerCollapsed, theme]);

    return (
      <AppBar
        sx={{
          display: appbarDisplay,
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
        ref={ref}
        position="fixed"
      >
        <Box
          sx={{
            width: logoBoxWidth,
            height: `${navBarHeight}px`,
            pr: theme.spacing(1),
          }}
          component={Link}
          to={homePath}
        >
          {isMobile || isNavDrawerCollapsed ? shortLogo : longLogo}
        </Box>
        <Divider
          sx={{
            my: theme.spacing(0.5),
            backgroundColor: 'background.default',
            width: theme.spacing(0.25),
          }}
          orientation="vertical"
          flexItem
        />
        <Box
          sx={{
            px:
              isMobile ||
              navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.hidden
                ? theme.spacing(1)
                : theme.spacing(WORKSPACE_PADDING_X_SPACING),
          }}
        >
          {topToolbar}
          {(isMobile || isNavDrawerHidden) && (
            <Tooltip
              title={isNavDrawerHidden ? 'Show side bar' : 'Hide side bar'}
            >
              <IconButton onClick={toggleNavDrawerCallback}>
                <MuiFaIcon icon={faBars} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </AppBar>
    );
  },
);

export default NavTopBar;
