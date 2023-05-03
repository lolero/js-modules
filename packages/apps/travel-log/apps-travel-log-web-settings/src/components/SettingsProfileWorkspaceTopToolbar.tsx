import React from 'react';
import Box from '@mui/material/Box';
import { BackIconButton, MuiFaIcon } from '@js-modules/web-react-components';
import Fab from '@mui/material/Fab';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Link } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesSettings,
  SubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileWorkspaceActionsMenu } from './SettingsProfileWorkspaceActionsMenu';

export const SettingsProfileWorkspaceTopToolbar: React.FC = () => {
  return (
    <>
      <BackIconButton />
      <Box
        sx={{
          flexGrow: 1,
        }}
      />
      <Box>
        <Fab
          color="primary"
          size="small"
          component={Link}
          to={
            myModulesRoutesMetadata[MyModules.settings].subRoutes![
              SubModulesSettings.profile
            ].subRoutes![SubModulesSettingsProfile.edit].path
          }
        >
          <MuiFaIcon icon={faPenToSquare} />
        </Fab>
        <SettingsProfileWorkspaceActionsMenu />
      </Box>
    </>
  );
};
