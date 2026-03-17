import React, { useMemo } from 'react';
import {
  MuiFaIcon,
  useMenuUtils,
  FindManyRangesMenu,
} from '@js-modules/web-react-utils';
import { Link, useSearchParams } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import {
  FindManyRangesTypes,
  FindManyRangeType,
  useFindManyRangesUtils,
} from '@js-modules/common-react-utils';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { LogDatePicker } from './LogDatePicker';

const rangeTypes: FindManyRangesTypes = {
  id: FindManyRangeType.number,
  title: FindManyRangeType.string,
  createdAt: FindManyRangeType.date,
  updatedAt: FindManyRangeType.date,
  deletedAt: FindManyRangeType.date,
};

export const LogWorkspaceActionsMenu: React.FC = () => {
  const routeMetadataAddNew = useMemo(
    () =>
      routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
        WebSubModulesLog.logEntry
      ].subRoutes![WebSubModulesLogLogEntry.addNew],
    [],
  );

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const [searchParams, setSearchParams] = useSearchParams();

  const { rangeKeysActive } = useFindManyRangesUtils(
    searchParams,
    setSearchParams,
    rangeTypes,
  );

  const rangesMenuButton = useMemo(() => {
    if (rangeKeysActive.length === 0) {
      return (
        <MenuItem>
          <ListItemIcon>
            <MuiFaIcon icon={faCalendarPlus} />
          </ListItemIcon>
          <ListItemText>Add filter range</ListItemText>
        </MenuItem>
      );
    }

    return (
      <MenuItem>
        <ListItemIcon>
          <MuiFaIcon icon={faCalendarDays} />
        </ListItemIcon>
        <ListItemText>{rangeKeysActive.length} Filter ranges</ListItemText>
      </MenuItem>
    );
  }, [rangeKeysActive.length]);

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
        <MenuItem component={Link} to={routeMetadataAddNew.path}>
          <ListItemIcon>
            <MuiFaIcon icon={routeMetadataAddNew.icon} />
          </ListItemIcon>
          <ListItemText>{routeMetadataAddNew.label}</ListItemText>
        </MenuItem>
        <LogDatePicker />
        <FindManyRangesMenu rangeTypes={rangeTypes} button={rangesMenuButton} />
      </Menu>
    </>
  );
};
