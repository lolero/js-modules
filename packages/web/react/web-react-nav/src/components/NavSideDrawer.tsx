import React, { forwardRef, useCallback, useContext, useMemo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme, Theme } from '@mui/material/styles';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';
import {
  NAV_DRAWER_WIDTH_COLLAPSED_SPACING,
  NAV_DRAWER_WIDTH_EXPANDED_SPACING,
} from '../constants/navConstants';
import { WorkspaceBoxContext } from '../contexts/WorkspaceBoxContext';
import useNavDisplayMetadata from '../hooks/useNavDisplayMetadata';
import { NavSideDrawerDisplayStatus } from '../contexts/NavSideDrawerDisplayStatusContext';

const dividerSx = {
  mx: (theme: Theme) => theme.spacing(0.5),
} as const;

type Props = {
  sideToolbar: React.ReactNode;
  sideFooter: React.ReactNode;
};

const NavSideDrawer = forwardRef<HTMLDivElement, Props>(
  ({ sideToolbar, sideFooter }, ref) => {
    const {
      navSideDrawerDisplayStatus,
      setNavSideDrawerDisplayStatus,
      navBarHeight,
    } = useContext(WorkspaceBoxContext);

    const theme = useTheme();

    const { isMobile, isTablet } = useNavDisplayMetadata();

    const navDrawerWidth = useMemo(() => {
      if (navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.collapsed) {
        return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
      }

      return theme.spacing(NAV_DRAWER_WIDTH_EXPANDED_SPACING);
    }, [navSideDrawerDisplayStatus, theme]);

    const closeDrawerCallback = useCallback(() => {
      if (
        isMobile &&
        navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.expanded
      ) {
        setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.hidden);
      }
    }, [isMobile, navSideDrawerDisplayStatus, setNavSideDrawerDisplayStatus]);

    const drawerVariant: DrawerProps['variant'] = useMemo(() => {
      if (
        isMobile ||
        (isTablet &&
          navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.expanded)
      ) {
        return 'temporary';
      }

      return 'permanent';
    }, [isMobile, isTablet, navSideDrawerDisplayStatus]);

    return (
      <Drawer
        ref={ref}
        sx={{
          width: navDrawerWidth,
        }}
        variant={drawerVariant}
        open={navSideDrawerDisplayStatus !== NavSideDrawerDisplayStatus.hidden}
        PaperProps={{
          sx: {
            top: navBarHeight,
            height: `calc(100% - ${navBarHeight}px)`,
            width: navDrawerWidth,
            overflow: 'visible',
            border: 'none',
            ...NavBoxShadowVerticalSx,
          },
        }}
        onClose={closeDrawerCallback}
      >
        <Divider sx={dividerSx} />
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {sideToolbar}
        </Box>
        <Box>{sideFooter}</Box>
      </Drawer>
    );
  },
);

export default NavSideDrawer;
