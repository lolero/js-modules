import React, { useMemo } from 'react';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { Link } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesMyLog,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import { FindManyRangesMenu } from '@js-modules/web-react-components/src/components/FindManyRangesMenu';
import {
  FindManyRangesTypes,
  FindManyRangeType,
  useFindManyRangesUtils,
} from '@js-modules/common-react-hooks';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';

const rangeTypes: FindManyRangesTypes = {
  id: FindManyRangeType.number,
  title: FindManyRangeType.string,
  createdAt: FindManyRangeType.date,
  updatedAt: FindManyRangeType.date,
  deletedAt: FindManyRangeType.date,
};

export const MyLogWorkspaceActionsMenu: React.FC = () => {
  const routeMetadataAddNew = useMemo(
    () =>
      routesMetadataPrivate[WebModulesPrivate.myLog].subRoutes![
        WebSubModulesMyLog.logEntry
      ].subRoutes![WebSubModulesMyLogLogEntry.addNew],
    [],
  );

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { rangeKeysActive } = useFindManyRangesUtils(rangeTypes);

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
          <ListItemIcon>{routeMetadataAddNew.icon}</ListItemIcon>
          <ListItemText>{routeMetadataAddNew.label}</ListItemText>
        </MenuItem>
        <FindManyRangesMenu rangeTypes={rangeTypes} button={rangesMenuButton} />
      </Menu>
    </>
  );
};
