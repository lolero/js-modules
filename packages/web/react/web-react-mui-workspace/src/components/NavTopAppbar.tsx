import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type React from 'react';
import { forwardRef, useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import {
  ScrollDirection,
  WorkspaceContext,
} from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavLeftDrawerDisplayButton } from './NavLeftDrawerDisplayButton';

export const CSS_CLASSNAME__NAV_APPBAR_LOGO_BOX = 'nav-appbar-logo-box';

type NavTopAppbarProps = {
  shortLogo: React.ReactNode;
  longLogo: React.ReactNode;
  homePath: string;
  isNavLeftDrawerWithContent: boolean;
  children: React.ReactNode;
};

export const NavTopAppbar = forwardRef<HTMLDivElement, NavTopAppbarProps>(
  function NavTopAppbar(
    { shortLogo, longLogo, homePath, isNavLeftDrawerWithContent, children },
    ref,
  ) {
    const {
      navLeftDrawerDisplayStatus,
      showNavLeftDrawerString,
      hideNavLeftDrawerString,
      navLeftDrawerCollapsedWidth,
      navLeftDrawerExpandedWidth,
      workspacePaddingXSpacing,
    } = useContext(NavContext);

    const { navTopToolbarHeight, workspaceScrollDirection } =
      useContext(WorkspaceContext);

    const {
      isMobile,
      isNavLeftDrawerHidden,
      isNavLeftDrawerCollapsed,
      isNavLeftDrawerExpanded,
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

    const appbarDisplay = useMemo(() => {
      if (isMobile && workspaceScrollDirection === ScrollDirection.down) {
        return 'none';
      }

      return 'flex';
    }, [workspaceScrollDirection, isMobile]);

    const logoBoxWidth = useMemo(() => {
      if (isMobile || isNavLeftDrawerCollapsed) {
        return navLeftDrawerCollapsedWidth;
      }

      return navLeftDrawerExpandedWidth;
    }, [
      isMobile,
      isNavLeftDrawerCollapsed,
      navLeftDrawerCollapsedWidth,
      navLeftDrawerExpandedWidth,
    ]);

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
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              color: 'primary.main',
              width: logoBoxWidth,
              display: 'flex',
              alignItems: 'center',
              height: `${navTopToolbarHeight}px`,
              pr: (t) => t.spacing(1.5),
              textDecoration: 'none !important',
              ...(isNavLeftDrawerCollapsed
                ? {
                    justifyContent: 'center',
                  }
                : {}),
            }}
            className={CSS_CLASSNAME__NAV_APPBAR_LOGO_BOX}
            component={Link}
            to={homePath}
          >
            {isMobile || isNavLeftDrawerCollapsed ? shortLogo : longLogo}
          </Box>
          <Divider
            sx={{
              my: (t) => t.spacing(0.5),
              ml: (t) => t.spacing(-0.15),
              backgroundColor: 'background.default',
              width: (t) => t.spacing(0.25),
            }}
            orientation="vertical"
            flexItem
          />
          <NavLeftDrawerDisplayButton />
          <Box
            sx={{
              px: (t) =>
                isMobile ||
                navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.hidden
                  ? t.spacing(1)
                  : t.spacing(workspacePaddingXSpacing),
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            {children}
            {isNavLeftDrawerWithContent &&
              (isMobile || isNavLeftDrawerHidden) && (
                <Tooltip
                  title={
                    isNavLeftDrawerHidden
                      ? showNavLeftDrawerString
                      : hideNavLeftDrawerString
                  }
                >
                  <IconButton onClick={toggleNavLeftDrawerCallback} edge="end">
                    <MuiFaIcon
                      icon={isNavLeftDrawerExpanded ? faXmark : faBars}
                    />
                  </IconButton>
                </Tooltip>
              )}
          </Box>
        </Box>
      </AppBar>
    );
  },
);
