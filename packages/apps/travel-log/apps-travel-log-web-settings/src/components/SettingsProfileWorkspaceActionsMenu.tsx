import React from 'react';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Link } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesSettings,
  SubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';

export const SettingsProfileWorkspaceActionsMenu: React.FC = () => {
  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

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
        <MenuItem
          component={Link}
          to={
            myModulesRoutesMetadata[MyModules.settings].subRoutes![
              SubModulesSettings.profile
            ].subRoutes![SubModulesSettingsProfile.edit].path
          }
        >
          <ListItemIcon>
            <MuiFaIcon icon={faPenToSquare} />
          </ListItemIcon>
          <ListItemText>Edit profile</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
