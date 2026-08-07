import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import type React from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { useWebRouter } from '@js-modules/web-react-router';
import { NavContext } from '../contexts/NavContext';
import {
  ScrollDirection,
  WorkspaceContext,
} from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { CSS_CLASSNAME__NAV_APPBAR_LOGO_BOX } from '../styles/cssClassNames';
import { NavBoxShadowHorizontalSx } from '../styles/navStyles';
import { NavLeftDrawerDisplayButton } from './NavLeftDrawerDisplayButton';

type NavTopAppbarProps = {
  ref?: React.Ref<HTMLDivElement>;
  shortLogo: React.ReactNode;
  longLogo: React.ReactNode;
  homePath: string;
  isNavLeftDrawerWithContent: boolean;
  children: React.ReactNode;
};

/**
 * Top application bar carrying the logo, drawer toggles and toolbar content.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying app bar element.
 * @param props.shortLogo - Logo shown when the left drawer is collapsed.
 * @param props.longLogo - Logo shown when the left drawer is expanded.
 * @param props.homePath - Path the logo links to.
 * @param props.isNavLeftDrawerWithContent - Whether the left drawer has content, which decides if the toggle button is shown.
 * @param props.children - Toolbar content rendered beside the logo.
 * @returns The app bar element.
 */
export function NavTopAppbar({
  ref,
  shortLogo,
  longLogo,
  homePath,
  isNavLeftDrawerWithContent,
  children,
}: NavTopAppbarProps) {
  const {
    showNavLeftDrawerString,
    hideNavLeftDrawerString,
    navLeftDrawerCollapsedWidth,
    navLeftDrawerExpandedWidth,
    workspacePaddingXSpacing,
  } = useContext(NavContext);

  const { navTopToolbarHeight, workspaceScrollDirection } =
    useContext(WorkspaceContext);

  const { LinkComponent } = useWebRouter();

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

  const theme = useTheme();

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
        // NavBoxShadowHorizontalSx on the ::after pseudo-element so the appbar's
        // bottom edge matches the side drawers' shadow, without its clipPath
        // affecting the appbar's own content
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          ...NavBoxShadowHorizontalSx,
        },
      }}
      ref={ref}
      elevation={0}
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
            pr: 1.5,
            textDecoration: 'none !important',
            ...(isNavLeftDrawerCollapsed ? { justifyContent: 'center' } : {}),
          }}
          className={CSS_CLASSNAME__NAV_APPBAR_LOGO_BOX}
          component={LinkComponent}
          href={homePath}
        >
          {isMobile || isNavLeftDrawerCollapsed ? shortLogo : longLogo}
        </Box>
        <Divider
          sx={{
            my: 0.5,
            ml: -0.15,
            backgroundColor: 'background.default',
            width: theme.spacing(0.25),
          }}
          orientation="vertical"
          flexItem
        />
        <NavLeftDrawerDisplayButton />
        <Box
          sx={{
            px:
              isMobile || isNavLeftDrawerHidden ? 1 : workspacePaddingXSpacing,
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
}
