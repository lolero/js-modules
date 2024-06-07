import React from 'react';
import Box from '@mui/material/Box';
import { BackIconButton, MuiFaIcon } from '@js-modules/web-react-components';
import Fab from '@mui/material/Fab';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Link } from 'react-router-dom';
import {
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileWorkspaceActionsMenu } from './SettingsProfileWorkspaceActionsMenu';

export const SettingsProfileWorkspaceTopToolbar: React.FC = () => {
  return (
    <>
      <BackIconButton />
      <Box>
        <Fab
          color="primary"
          size="small"
          component={Link}
          to={
            modulesPrivateRoutesMetadata[WebModulesPrivate.settings].subRoutes![
              WebSubModulesSettings.profile
            ].subRoutes![WebSubModulesSettingsProfile.edit].path
          }
        >
          <MuiFaIcon icon={faPenToSquare} />
        </Fab>
        <SettingsProfileWorkspaceActionsMenu />
      </Box>
    </>
  );
};
