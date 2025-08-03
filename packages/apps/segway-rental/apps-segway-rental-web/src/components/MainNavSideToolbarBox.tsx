import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
import { SegwayRentalLogoIcon } from '@js-modules/apps-segway-rental-mui-icons';
import { NAV_DRAWER_WIDTH_COLLAPSED_SPACING } from '@js-modules/web-react-nav/src/constants/navConstants';
import { Modules } from '../types/segwayRentalWebTypes';
import useModule from '../hooks/useModule';

export enum MainNavSideToolbarBoxDataTestIds {
  homeTooltipTrigger = 'nav-side-toolbar-home-tooltip-trigger',
  locationsTooltipTrigger = 'nav-side-toolbar-locations-tooltip-trigger',
  usersTooltipTrigger = 'nav-side-toolbar-users-tooltip-trigger',
  segwaysTooltipTrigger = 'nav-side-toolbar-segways-tooltip-trigger',
  reservationsTooltipTrigger = 'nav-side-toolbar-reservations-tooltip-trigger',
  settingsTooltipTrigger = 'nav-side-toolbar-settings-tooltip-trigger',
  helpTooltipTrigger = 'nav-side-toolbar-help-tooltip-trigger',
}

const MainNavSideToolbarBox: React.FunctionComponent = () => {
  const {
    isNavLeftDrawerExpanded,
    closeNavLeftDrawerCallback,
    navLeftDrawerTooltipDisableListenersProps,
  } = useNavDisplayMetadata();

  const module = useModule();

  const theme = useTheme();

  const tabsSx = useMemo(() => {
    return {
      [`&.${tabsClasses.root}`]: {
        my: theme.spacing(1),
      },
      [`& .${tabClasses.root}`]: {
        display: 'flex',
        justifyContent: 'start',
        minHeight: 0,
        height: `${theme.spacing(4)} !important`,
        minWidth: 0,
        maxWidth: theme.spacing(100),
        width: isNavLeftDrawerExpanded
          ? 'auto'
          : theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING - 2),
        my: theme.spacing(1),
        mx: theme.spacing(1),
        [`& .${tabClasses.iconWrapper}`]: {
          mr: theme.spacing(2),
        },
      },
    } as const;
  }, [isNavLeftDrawerExpanded, theme]);

  return (
    <Box>
      <Tabs
        sx={{
          ...tabsSx,
        }}
        orientation="vertical"
        value={module}
      >
        <Tab sx={{ display: 'none !important' }} value={module} />
        <Tab
          value={Modules.home}
          label={isNavLeftDrawerExpanded ? Modules.home : null}
          component={Link}
          to={`/${Modules.home}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.home}
              data-testid={MainNavSideToolbarBoxDataTestIds.homeTooltipTrigger}
            >
              <MuiFaIcon icon={faHouse} />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.locations}
          label={isNavLeftDrawerExpanded ? Modules.locations : null}
          component={Link}
          to={`/${Modules.locations}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.locations}
              data-testid={
                MainNavSideToolbarBoxDataTestIds.locationsTooltipTrigger
              }
            >
              <MuiFaIcon icon={faMapLocationDot} />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.users}
          label={isNavLeftDrawerExpanded ? Modules.users : null}
          component={Link}
          to={`/${Modules.users}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.users}
              data-testid={MainNavSideToolbarBoxDataTestIds.usersTooltipTrigger}
            >
              <MuiFaIcon icon={faUsers} />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.segways}
          label={isNavLeftDrawerExpanded ? Modules.segways : null}
          component={Link}
          to={`/${Modules.segways}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.segways}
              data-testid={
                MainNavSideToolbarBoxDataTestIds.segwaysTooltipTrigger
              }
            >
              <SegwayRentalLogoIcon />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.reservations}
          label={isNavLeftDrawerExpanded ? Modules.reservations : null}
          component={Link}
          to={`/${Modules.reservations}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.reservations}
              data-testid={
                MainNavSideToolbarBoxDataTestIds.reservationsTooltipTrigger
              }
            >
              <MuiFaIcon icon={faCalendarDays} />
            </Tooltip>
          }
          iconPosition="start"
        />
      </Tabs>
      <Divider sx={{ mx: 0.5 }} />
      <Tabs
        sx={{
          ...tabsSx,
          mt: theme.spacing(2),
        }}
        orientation="vertical"
        value={module}
      >
        <Tab sx={{ display: 'none !important' }} value={module} />
        <Tab
          value={Modules.settings}
          label={isNavLeftDrawerExpanded ? Modules.settings : null}
          component={Link}
          to={`/${Modules.settings}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.settings}
              data-testid={
                MainNavSideToolbarBoxDataTestIds.settingsTooltipTrigger
              }
            >
              <MuiFaIcon icon={faGear} />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.help}
          label={isNavLeftDrawerExpanded ? Modules.help : null}
          component={Link}
          to={`/${Modules.help}`}
          onClick={closeNavLeftDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...navLeftDrawerTooltipDisableListenersProps}
              title={Modules.help}
              data-testid={MainNavSideToolbarBoxDataTestIds.helpTooltipTrigger}
            >
              <MuiFaIcon icon={faCircleQuestion} />
            </Tooltip>
          }
          iconPosition="start"
        />
      </Tabs>
      <Divider sx={{ mx: 0.5 }} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: theme.spacing(1),
        }}
      >
        here go the ads
      </Box>
    </Box>
  );
};

export default MainNavSideToolbarBox;
