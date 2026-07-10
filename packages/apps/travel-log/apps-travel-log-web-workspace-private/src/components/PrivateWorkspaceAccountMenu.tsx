import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import startCase from 'lodash/startCase';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import {
  ThemePalette,
  WEB_CLIENT__URI__TRAVEL_LOG,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import {
  useStateAuthLogout,
  useStateMainUpdatePartialReducerMetadata,
  useStateSettingsSignout,
} from '@js-modules/apps-travel-log-common-store-redux';
import { MuiFaIcon, useMenuUtils } from '@js-modules/web-react-mui';

export function PrivateWorkspaceAccountMenu(): React.ReactNode {
  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const { callback: stateSettingsSignoutCallback } = useStateSettingsSignout();

  const {
    reducerMetadata: { themePalette },
    callback: stateMainUpdatePartialReducerMetadataCallback,
  } = useStateMainUpdatePartialReducerMetadata();

  const {
    reducerMetadata: { tokens },
    callback: logoutCallback,
  } = useStateAuthLogout(
    {
      redirectUri: `${WEB_CLIENT__URI__TRAVEL_LOG}${
        routesMetadataPublic[WebModulesPublic.home].path
      }`,
    },
    stateSettingsSignoutCallback,
  );

  const username = useMemo(() => {
    return startCase(
      (tokens?.id.metadata.given_name as string | undefined) ?? '',
    );
  }, [tokens?.id.metadata.given_name]);

  const copyTokenCallback = useCallback(() => {
    void navigator.clipboard.writeText(tokens!.access.token);
  }, [tokens]);

  const toggleThemeCallback = useCallback(() => {
    stateMainUpdatePartialReducerMetadataCallback({
      themePalette:
        themePalette === ThemePalette.light
          ? ThemePalette.dark
          : ThemePalette.light,
    });
  }, [stateMainUpdatePartialReducerMetadataCallback, themePalette]);

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
        <MenuItem onClick={toggleThemeCallback}>
          <ListItemIcon>
            <MuiFaIcon
              icon={themePalette === ThemePalette.light ? faMoon : faSun}
            />
          </ListItemIcon>
          <ListItemText>
            Light {themePalette === ThemePalette.light ? 'off' : 'on'}
          </ListItemText>
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
}
