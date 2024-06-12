import React, { useCallback, useMemo } from 'react';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import {
  useStateAuthLogout,
  useStateSettingsSignout,
} from '@js-modules/apps-travel-log-common-store-redux';
import {
  WEB_CLIENT_URI_TRAVEL_LOG,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import startCase from 'lodash/startCase';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-web-components';

export const MyWorkspaceAccountMenu: React.FC = () => {
  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { callback: stateSettingsSignoutCallback } = useStateSettingsSignout();

  const {
    reducerMetadata: { tokens },
    callback: logoutCallback,
  } = useStateAuthLogout(
    WEB_CLIENT_URI_TRAVEL_LOG,
    routesMetadataPublic[WebModulesPublic.home].path,
    stateSettingsSignoutCallback,
  );

  const username = useMemo(() => {
    return startCase(tokens?.id.metadata.given_name ?? '');
  }, [tokens?.id.metadata.given_name]);

  const copyTokenCallback = useCallback(() => {
    navigator.clipboard.writeText(tokens!.access.token);
  }, [tokens]);

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
        <MenuItem disabled>
          <ListItemText>{username}</ListItemText>
        </MenuItem>
        <MenuItem onClick={logoutCallback}>
          <ListItemIcon>
            <MuiFaIcon icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
        <MenuItem onClick={copyTokenCallback}>
          <ListItemIcon>
            <MuiFaIcon icon={faCopy} />
          </ListItemIcon>
          <ListItemText>Access token</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
