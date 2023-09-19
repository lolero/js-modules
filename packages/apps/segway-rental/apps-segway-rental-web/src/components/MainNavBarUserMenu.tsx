import React from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useStateAuthReducerMetadata } from '@js-modules/apps-segway-rental-store-redux';
import { Avatar } from '@mui/material';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  logoutCallback: () => void;
};

const MainNavBarUserMenu: React.FunctionComponent<Props> = ({
  logoutCallback,
}) => {
  const { authUser } = useStateAuthReducerMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  return (
    <>
      <IconButton onClick={openMenuCallback} size="small">
        <Avatar
          alt={authUser?.displayName || ''}
          src={authUser?.photoURL || ''}
        />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        <MenuItem onClick={logoutCallback}>
          <ListItemIcon>
            <MuiFaIcon icon={faSignOutAlt} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export const MainNavBarUserMenuRaw = MainNavBarUserMenu;
export const MainNavBarUserMenuMemo = React.memo(MainNavBarUserMenuRaw);
export default MainNavBarUserMenuMemo;
