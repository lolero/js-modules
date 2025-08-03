import React, { forwardRef, useContext, useMemo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';

type NavLeftDrawerProps = {
  navLeftDrawerContent?: React.ReactNode;
  navLeftDrawerFooter?: React.ReactNode;
};

export const NavLeftDrawer = forwardRef<HTMLDivElement, NavLeftDrawerProps>(
  ({ navLeftDrawerContent, navLeftDrawerFooter }, ref) => {
    const {
      navLeftDrawerDisplayStatus,
      navLeftDrawerCollapsedWidth,
      navLeftDrawerExpandedWidth,
    } = useContext(NavContext);

    const { navTopToolbarHeight } = useContext(WorkspaceContext);

    const { isMobile, isTablet, closeNavLeftDrawerCallback } =
      useNavDisplayMetadata();

    const navDrawerWidth = useMemo(() => {
      if (navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed) {
        return navLeftDrawerCollapsedWidth;
      }

      if (
        isMobile &&
        navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.expanded
      ) {
        return '100%';
      }

      return navLeftDrawerExpandedWidth;
    }, [
      isMobile,
      navLeftDrawerDisplayStatus,
      navLeftDrawerCollapsedWidth,
      navLeftDrawerExpandedWidth,
    ]);

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
        <Divider sx={{ mx: 0.5 }} />
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
