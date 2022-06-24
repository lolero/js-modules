import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { useTheme, Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  useCloseNavSideDrawerCallback,
  useNavDisplayMetadata,
} from '@js-modules/web-react-nav';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { faBicycle } from '@fortawesome/free-solid-svg-icons/faBicycle';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
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

const dividerSx = {
  mx: (theme: Theme) => theme.spacing(0.5),
} as const;

const MainNavSideToolbarBox: React.FunctionComponent = () => {
  const { isNavDrawerExpanded, tooltipDisableListenersProps } =
    useNavDisplayMetadata();

  const module = useModule();

  const theme = useTheme();

  const tabsSx = useMemo(() => {
    return {
      // [`&.${tabsClasses.root}`]: {
      //   borderRadius: 0,
      //   backgroundColor: 'background.default',
      // },
      // [`& .${tabClasses.root}`]: {
      //   display: 'flex',
      //   justifyContent: 'start',
      //   minHeight: 0,
      //   height: `${theme.spacing(5)} !important`,
      //   minWidth: 0,
      //   maxWidth: theme.spacing(100),
      //   width: isNavDrawerExpanded ? 'auto' : theme.spacing(7),
      //   my: theme.spacing(1),
      //   mx: theme.spacing(3.5),
      //   pl: theme.spacing(2),
      //   py: 0,
      //   [`& .${tabClasses.iconWrapper}`]: {
      //     mr: theme.spacing(3),
      //   },
      // },
    } as const;
  }, [isNavDrawerExpanded, theme]);

  const closeNavSideDrawerCallback = useCloseNavSideDrawerCallback();

  return (
    <Box>
      <Tabs
        sx={{
          ...tabsSx,
          mb: theme.spacing(2),
        }}
        orientation="vertical"
        value={module}
      >
        <Tab sx={{ display: 'none !important' }} value={module} />
        <Tab
          value={Modules.home}
          label={isNavDrawerExpanded ? Modules.home : null}
          component={Link}
          to={`/${Modules.home}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
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
          label={isNavDrawerExpanded ? Modules.locations : null}
          component={Link}
          to={`/${Modules.locations}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
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
          label={isNavDrawerExpanded ? Modules.users : null}
          component={Link}
          to={`/${Modules.users}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
              title={Modules.users}
              data-testid={MainNavSideToolbarBoxDataTestIds.usersTooltipTrigger}
            >
              <MuiFaIcon icon={faMapLocationDot} />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.segways}
          label={isNavDrawerExpanded ? Modules.segways : null}
          component={Link}
          to={`/${Modules.segways}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
              title={Modules.segways}
              data-testid={
                MainNavSideToolbarBoxDataTestIds.segwaysTooltipTrigger
              }
            >
              <MuiFaIcon icon={faBicycle} />
            </Tooltip>
          }
          iconPosition="start"
        />
        <Tab
          value={Modules.reservations}
          label={isNavDrawerExpanded ? Modules.reservations : null}
          component={Link}
          to={`/${Modules.reservations}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
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
      <Divider sx={dividerSx} />
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
          label={isNavDrawerExpanded ? Modules.settings : null}
          component={Link}
          to={`/${Modules.settings}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
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
          label={isNavDrawerExpanded ? Modules.help : null}
          component={Link}
          to={`/${Modules.help}`}
          onClick={closeNavSideDrawerCallback}
          icon={
            <Tooltip
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tooltipDisableListenersProps}
              title={Modules.help}
              data-testid={MainNavSideToolbarBoxDataTestIds.helpTooltipTrigger}
            >
              <MuiFaIcon icon={faCircleQuestion} />
            </Tooltip>
          }
          iconPosition="start"
        />
      </Tabs>
      <Divider sx={dividerSx} />
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
