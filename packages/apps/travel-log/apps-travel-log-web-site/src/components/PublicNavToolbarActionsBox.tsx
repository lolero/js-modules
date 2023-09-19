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
  WEB_CLIENT_URI_TRAVEL_LOG,
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
} from '@js-modules/apps-travel-log-common-constants';
import {
  useStateAuthLogin,
  useStateAuthSignup,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';

export const PublicNavToolbarActionsBox: React.FC = () => {
  const { isMobile } = useNavDisplayMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const {
    reducerMetadata: { isAuthenticated },
    callback: stateAuthSignupCallback,
  } = useStateAuthSignup(
    WEB_CLIENT_URI_TRAVEL_LOG,
    modulesPrivateRoutesMetadata[WebModulesPrivate.myFeeds].path,
    stateSettingsGetProfileCallback,
  );

  const { callback: stateAuthLoginCallback } = useStateAuthLogin(
    WEB_CLIENT_URI_TRAVEL_LOG,
    modulesPrivateRoutesMetadata[WebModulesPrivate.myFeeds].path,
    stateSettingsGetProfileCallback,
  );

  return (
    <Box>
      {isAuthenticated && (
        <Button
          component={Link}
          to={modulesPrivateRoutesMetadata[WebModulesPrivate.myFeeds].path}
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
            <MenuItem onClick={stateAuthSignupCallback}>
              <ListItemIcon>
                <MuiFaIcon icon={faUserPlus} />
              </ListItemIcon>
              <ListItemText>Sign up!</ListItemText>
            </MenuItem>
            <MenuItem onClick={stateAuthLoginCallback}>
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
            onClick={stateAuthSignupCallback}
          >
            Sign up!
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<MuiFaIcon icon={faRightToBracket} />}
            onClick={stateAuthLoginCallback}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
};
