import React from 'react';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { useLogout } from '@js-modules/apps-travel-log-common-store-redux';

export const MyWorkspaceAccountMenu: React.FC = () => {
  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { logoutCallback } = useLogout();

  return (
    <>
      <IconButton size="small" onClick={openMenuCallback}>
        <Avatar
          sx={{
            width: '32px',
            height: '32px',
          }}
        />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        <MenuItem onClick={logoutCallback}>
          <ListItemIcon>
            <MuiFaIcon icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
