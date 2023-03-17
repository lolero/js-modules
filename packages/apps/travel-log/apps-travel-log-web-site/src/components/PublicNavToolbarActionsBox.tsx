import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import {
  WEB_CLIENT_BASE_URI,
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-travel-log-common-constants';
import {
  useStateAuthLogin,
  useStateAuthSignup,
} from '@js-modules/apps-travel-log-common-store-redux';

export const PublicNavToolbarActionsBox: React.FC = () => {
  const { isMobile } = useNavDisplayMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const {
    reducerMetadata: { isAuthenticated },
    callback: signupCallback,
  } = useStateAuthSignup(
    WEB_CLIENT_BASE_URI,
    myModulesRoutesMetadata[MyModules.myFeeds].path,
  );

  const { callback: loginCallback } = useStateAuthLogin(
    WEB_CLIENT_BASE_URI,
    myModulesRoutesMetadata[MyModules.myFeeds].path,
  );

  return (
    <Box>
      {isAuthenticated && (
        <Button
          component={Link}
          to={myModulesRoutesMetadata[MyModules.myFeeds].path}
          size="small"
        >
          Enter app
        </Button>
      )}
      {!isAuthenticated && isMobile && (
        <>
          <IconButton size="small" onClick={openMenuCallback}>
            <MuiFaIcon icon={faRightToBracket} />
          </IconButton>
          <Menu
            open={!!menuAnchor}
            anchorEl={menuAnchor}
            onClose={closeMenuCallback}
          >
            <MenuItem onClick={signupCallback}>
              <ListItemIcon>
                <MuiFaIcon icon={faUserPlus} />
              </ListItemIcon>
              <ListItemText>Sign up!</ListItemText>
            </MenuItem>
            <MenuItem onClick={loginCallback}>
              <ListItemIcon>
                <MuiFaIcon icon={faRightToBracket} />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
      {!isAuthenticated && !isMobile && (
        <>
          <Button
            sx={{
              mr: 1,
            }}
            variant="contained"
            size="small"
            endIcon={<MuiFaIcon icon={faUserPlus} />}
            onClick={signupCallback}
          >
            Sign up!
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<MuiFaIcon icon={faRightToBracket} />}
            onClick={loginCallback}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
};
