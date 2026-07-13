import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { DrawerProps } from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import type React from 'react';
import { forwardRef, useContext, useMemo } from 'react';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { CSS_CLASSNAME__NAV_LEFT_DRAWER } from '../styles/cssClassNames';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';

type NavLeftDrawerProps = {
  navLeftDrawerContent?: React.ReactNode;
  navLeftDrawerFooter?: React.ReactNode;
};

export const NavLeftDrawer = forwardRef<HTMLDivElement, NavLeftDrawerProps>(
  function NavLeftDrawer({ navLeftDrawerContent, navLeftDrawerFooter }, ref) {
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
        className={CSS_CLASSNAME__NAV_LEFT_DRAWER}
        sx={{
          width: navDrawerWidth,
        }}
        variant={drawerVariant}
        anchor={isMobile ? 'right' : 'left'}
        open={navLeftDrawerDisplayStatus !== NavDrawerDisplayStatus.hidden}
        slotProps={{
          paper: {
            sx: {
              top: navTopToolbarHeight,
              height: `calc(100% - ${navTopToolbarHeight}px)`,
              width: navDrawerWidth,
              overflow: 'visible',
              border: 'none',
              // NavBoxShadowVerticalSx on the ::after pseudo-element so the
              // expand/collapse buttons display outside the drawer's top edge
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                ...NavBoxShadowVerticalSx,
              },
            },
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
            scrollbarWidth: 'none',
          }}
        >
          {navLeftDrawerContent}
        </Box>
        <Box>{navLeftDrawerFooter}</Box>
      </Drawer>
    );
  },
);
