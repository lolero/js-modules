import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import type React from 'react';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { BackIconButton, MuiFaIcon } from '@js-modules/web-react-mui';
import { SettingsProfileWorkspaceActionsMenu } from './SettingsProfileWorkspaceActionsMenu';

export const SettingsProfileWorkspaceTopToolbar: React.FC = () => {
  const navigate = useNavigate();

  const navigateBackCallback = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  return (
    <>
      <BackIconButton onClick={navigateBackCallback} />
      <Box>
        <Fab
          color="primary"
          size="small"
          component={Link}
          to={
            routesMetadataPrivate[WebModulesPrivate.settings].subRoutes![
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
