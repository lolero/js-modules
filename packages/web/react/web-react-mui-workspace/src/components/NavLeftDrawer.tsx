import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { DrawerProps } from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import type React from 'react';
import { useContext } from 'react';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { CSS_CLASSNAME__NAV_LEFT_DRAWER } from '../styles/cssClassNames';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';

type NavLeftDrawerProps = {
  ref?: React.Ref<HTMLDivElement>;
  navLeftDrawerContent?: React.ReactNode;
  navLeftDrawerFooter?: React.ReactNode;
};

/**
 * Left navigation drawer, sized and shown per the current display status.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying drawer element.
 * @param props.navLeftDrawerContent - Scrollable body of the drawer.
 * @param props.navLeftDrawerFooter - Content pinned below the drawer body.
 * @returns The left drawer element.
 */
export function NavLeftDrawer({
  ref,
  navLeftDrawerContent,
  navLeftDrawerFooter,
}: NavLeftDrawerProps): React.ReactNode {
  const { navLeftDrawerCollapsedWidth, navLeftDrawerExpandedWidth } =
    useContext(NavContext);

  const { navTopToolbarHeight } = useContext(WorkspaceContext);

  const {
    isMobile,
    isTablet,
    isNavLeftDrawerExpanded,
    isNavLeftDrawerCollapsed,
    isNavLeftDrawerHidden,
    closeNavLeftDrawerCallback,
  } = useNavDisplayMetadata();

  let navDrawerWidth = navLeftDrawerExpandedWidth;
  if (isNavLeftDrawerCollapsed) {
    navDrawerWidth = navLeftDrawerCollapsedWidth;
  } else if (isMobile && isNavLeftDrawerExpanded) {
    navDrawerWidth = '100%';
  }

  let drawerVariant: DrawerProps['variant'] = 'permanent';
  if (isMobile || (isTablet && isNavLeftDrawerExpanded)) {
    drawerVariant = 'temporary';
  }

  return (
    <Drawer
      ref={ref}
      className={CSS_CLASSNAME__NAV_LEFT_DRAWER}
      sx={{
        width: navDrawerWidth,
      }}
      variant={drawerVariant}
      anchor={isMobile ? 'right' : 'left'}
      open={!isNavLeftDrawerHidden}
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
}
