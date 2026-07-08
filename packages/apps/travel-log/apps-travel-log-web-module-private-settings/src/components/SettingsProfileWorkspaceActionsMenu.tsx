import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { MuiFaIcon, useMenuUtils } from '@js-modules/web-react-mui';
import { WebLink } from '@js-modules/web-react-router';

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
          component={WebLink}
          href={
            routesMetadataPrivate[WebModulesPrivate.settings].subRoutes![
              WebSubModulesSettings.profile
            ].subRoutes![WebSubModulesSettingsProfile.edit].path
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
