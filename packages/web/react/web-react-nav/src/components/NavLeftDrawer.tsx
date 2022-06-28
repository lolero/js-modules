import React, { forwardRef, useContext, useMemo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme, Theme } from '@mui/material/styles';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';
import {
  NAV_DRAWER_WIDTH_COLLAPSED_SPACING,
  NAV_DRAWER_WIDTH_EXPANDED_SPACING,
} from '../constants/navConstants';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import { useCloseNavLeftDrawerCallback } from '../hooks/useCloseNavLeftDrawerCallback';

const dividerSx = {
  mx: (t: Theme) => t.spacing(0.5),
} as const;

type NavLeftDrawerProps = {
  navLeftDrawerContent?: React.ReactNode;
  navLeftDrawerFooter?: React.ReactNode;
};

export const NavLeftDrawer = forwardRef<HTMLDivElement, NavLeftDrawerProps>(
  ({ navLeftDrawerContent, navLeftDrawerFooter }, ref) => {
    const { navLeftDrawerDisplayStatus } = useContext(NavContext);

    const { navTopToolbarHeight } = useContext(WorkspaceContext);

    const theme = useTheme();

    const { isMobile, isTablet } = useNavDisplayMetadata();

    const closeNavLeftDrawerCallback = useCloseNavLeftDrawerCallback();

    const navDrawerWidth = useMemo(() => {
      if (navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed) {
        return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
      }

      if (
        isMobile &&
        navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.expanded
      ) {
        return '100%';
      }

      return theme.spacing(NAV_DRAWER_WIDTH_EXPANDED_SPACING);
    }, [isMobile, navLeftDrawerDisplayStatus, theme]);

    const drawerVariant: DrawerProps['variant'] = useMemo(() => {
      if (
        isMobile ||
        (isTablet &&
          navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.expanded)
      ) {
        return 'temporary';
      }

      return 'permanent';
    }, [isMobile, isTablet, navLeftDrawerDisplayStatus]);

    return (
      <Drawer
        ref={ref}
        sx={{
          width: navDrawerWidth,
        }}
        variant={drawerVariant}
        anchor={isMobile ? 'right' : 'left'}
        open={navLeftDrawerDisplayStatus !== NavDrawerDisplayStatus.hidden}
        PaperProps={{
          sx: {
            top: navTopToolbarHeight,
            height: `calc(100% - ${navTopToolbarHeight}px)`,
            width: navDrawerWidth,
            overflow: 'visible',
            border: 'none',
            ...NavBoxShadowVerticalSx,
          },
        }}
        onClose={closeNavLeftDrawerCallback}
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
          {navLeftDrawerContent}
        </Box>
        <Box>{navLeftDrawerFooter}</Box>
      </Drawer>
    );
  },
);
