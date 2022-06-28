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
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import {
  WorkspaceContext,
  ScrollDirection,
} from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import {
  NAV_DRAWER_WIDTH_COLLAPSED_SPACING,
  NAV_DRAWER_WIDTH_EXPANDED_SPACING,
  WORKSPACE_PADDING_X_SPACING,
} from '../constants/navConstants';

type NavTopAppbarProps = {
  shortLogo: React.ReactNode;
  longLogo: React.ReactNode;
  homePath: string;
  isNavLeftDrawerWithContent: boolean;
  children: React.ReactNode;
};

export const NavTopAppbar = forwardRef<HTMLDivElement, NavTopAppbarProps>(
  (
    { shortLogo, longLogo, homePath, isNavLeftDrawerWithContent, children },
    ref,
  ) => {
    const {
      navLeftDrawerDisplayStatus,
      showNavLeftDrawerString,
      hideNavLeftDrawerString,
    } = useContext(NavContext);

    const { navTopToolbarHeight, workspaceScrollDirection } =
      useContext(WorkspaceContext);

    const theme = useTheme();

    const {
      isMobile,
      isNavLeftDrawerHidden,
      isNavLeftDrawerCollapsed,
      expandNavLeftDrawerCallback,
      hideNavLeftDrawerCallback,
    } = useNavDisplayMetadata();

    const toggleNavLeftDrawerCallback = useCallback(() => {
      if (isNavLeftDrawerHidden) {
        expandNavLeftDrawerCallback();
      } else {
        hideNavLeftDrawerCallback();
      }
    }, [
      expandNavLeftDrawerCallback,
      hideNavLeftDrawerCallback,
      isNavLeftDrawerHidden,
    ]);

    // TODO: add appbar animation
    const appbarDisplay = useMemo(() => {
      if (isMobile && workspaceScrollDirection === ScrollDirection.down) {
        return 'none';
      }

      return 'flex';
    }, [workspaceScrollDirection, isMobile]);

    const logoBoxWidth = useMemo(() => {
      if (isMobile || isNavLeftDrawerCollapsed) {
        return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
      }

      return theme.spacing(NAV_DRAWER_WIDTH_EXPANDED_SPACING);
    }, [isMobile, isNavLeftDrawerCollapsed, theme]);

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
            height: (t) => `calc(${navTopToolbarHeight}px - ${t.spacing(1)})`,
            pr: (t) => t.spacing(1),
          }}
          component={Link}
          to={homePath}
        >
          {isMobile || isNavLeftDrawerCollapsed ? shortLogo : longLogo}
        </Box>
        <Divider
          sx={{
            my: (t) => t.spacing(0.5),
            backgroundColor: 'background.default',
            width: (t) => t.spacing(0.25),
          }}
          orientation="vertical"
          flexItem
        />
        <Box
          sx={{
            px: (t) =>
              isMobile ||
              navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.hidden
                ? t.spacing(1)
                : t.spacing(WORKSPACE_PADDING_X_SPACING),
          }}
        >
          {children}
          {isNavLeftDrawerWithContent && (isMobile || isNavLeftDrawerHidden) && (
            <Tooltip
              title={
                isNavLeftDrawerHidden
                  ? showNavLeftDrawerString
                  : hideNavLeftDrawerString
              }
            >
              <IconButton onClick={toggleNavLeftDrawerCallback}>
                <MuiFaIcon icon={faBars} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </AppBar>
    );
  },
);
