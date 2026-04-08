import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type React from 'react';
import { Link } from 'react-router-dom';
import {
  WEB_CLIENT__URI__TRAVEL_LOG,
  WebModulesPrivate,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import type { StateAuthSigninRequestAction } from '@js-modules/apps-travel-log-common-store-redux';
import {
  useStateAuthLogin,
  useStateAuthSignup,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { MuiFaIcon, useMenuUtils } from '@js-modules/web-react-utils';

const redirectUri = `${WEB_CLIENT__URI__TRAVEL_LOG}${
  routesMetadataPrivate[WebModulesPrivate.feeds].path
}`;
const keycloakLoginOptions: StateAuthSigninRequestAction['requestMetadata']['keycloakLoginOptions'] =
  {
    redirectUri,
  };

export const PublicNavToolbarActionsBox: React.FC = () => {
  const { isMobile } = useNavDisplayMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const {
    reducerMetadata: { isAuthenticated },
    callback: stateAuthSignupCallback,
  } = useStateAuthSignup(keycloakLoginOptions, stateSettingsGetProfileCallback);

  const { callback: stateAuthLoginCallback } = useStateAuthLogin(
    keycloakLoginOptions,
    stateSettingsGetProfileCallback,
  );

  return (
    <Box>
      {isAuthenticated && (
        <Button
          component={Link}
          to={routesMetadataPrivate[WebModulesPrivate.feeds].path}
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
