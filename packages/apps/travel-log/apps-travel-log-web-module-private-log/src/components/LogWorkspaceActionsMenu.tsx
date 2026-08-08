import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import type { FindManyRangesTypes } from '@js-modules/common-react-utils';
import {
  FindManyRangeType,
  useFindManyRangesUtils,
} from '@js-modules/common-react-utils';
import {
  FindManyRangesMenu,
  MuiFaIcon,
  useMenuUtils,
} from '@js-modules/web-react-mui';
import { useWebRouter, WebLink } from '@js-modules/web-react-router';
import { LogDatePicker } from './LogDatePicker';

const rangeTypes: FindManyRangesTypes = {
  id: FindManyRangeType.number,
  title: FindManyRangeType.string,
  createdAt: FindManyRangeType.date,
  updatedAt: FindManyRangeType.date,
  deletedAt: FindManyRangeType.date,
};

const routeMetadataAddNew =
  routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
    WebSubModulesLog.logEntry
  ].subRoutes![WebSubModulesLogLogEntry.addNew];

export function LogWorkspaceActionsMenu(): React.ReactNode {
  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { searchParams, setSearchParams } = useWebRouter();

  const { rangeKeysActive } = useFindManyRangesUtils(
    searchParams,
    setSearchParams,
    rangeTypes,
  );

  const hasRangeKeysActive = rangeKeysActive.length > 0;
  const rangesMenuButton = (
    <MenuItem>
      <ListItemIcon>
        <MuiFaIcon
          icon={hasRangeKeysActive ? faCalendarDays : faCalendarPlus}
        />
      </ListItemIcon>
      <ListItemText>
        {hasRangeKeysActive
          ? `${rangeKeysActive.length} Filter ranges`
          : 'Add filter range'}
      </ListItemText>
    </MenuItem>
  );

  return (
    <>
      <IconButton size="small" onClick={openMenuCallback}>
        <MuiFaIcon icon={faEllipsisVertical} />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        <MenuItem component={WebLink} href={routeMetadataAddNew.path}>
          <ListItemIcon>
            <MuiFaIcon icon={routeMetadataAddNew.icon} />
          </ListItemIcon>
          <ListItemText>{routeMetadataAddNew.label}</ListItemText>
        </MenuItem>
        <LogDatePicker />
        <FindManyRangesMenu
          rangeTypes={rangeTypes}
          button={rangesMenuButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Menu>
    </>
  );
}
