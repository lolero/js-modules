import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type React from 'react';
import { MuiFaIcon, useMenuUtils } from '@js-modules/web-react-mui';

export const PrivateWorkspaceNotificationsMenu: React.FC = () => {
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
