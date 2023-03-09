import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

export const MyWorkspaceNotificationsMenu: React.FC = () => {
  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  return (
    <>
      <IconButton size="small" onClick={openMenuCallback}>
        <MuiFaIcon icon={faBell} />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        <MenuItem>
          <ListItemText>Test notification</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
