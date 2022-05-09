import React from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStateAuthReducerMetadata } from '@js-modules/apps-segway-rental-store-redux';
import { Avatar } from '@mui/material';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import { menuItemSx } from '@js-modules/web-styles-material-ui';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

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
        <MenuItem sx={menuItemSx.menuItem} onClick={logoutCallback}>
          <Box sx={menuItemSx.menuItemLabelBox}>
            <MuiFaIcon
              sx={menuItemSx.menuItemIcon}
              icon={faSignOutAlt}
              fontSize="small"
            />
            <Typography>Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export const MainNavBarUserMenuRaw = MainNavBarUserMenu;
export const MainNavBarUserMenuMemo = React.memo(MainNavBarUserMenuRaw);
export default MainNavBarUserMenuMemo;
