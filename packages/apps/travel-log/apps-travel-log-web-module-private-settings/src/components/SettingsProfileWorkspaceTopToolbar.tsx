import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { BackIconButton, MuiFaIcon } from '@js-modules/web-react-mui';
import { useWebRouter, WebLink } from '@js-modules/web-react-router';
import { SettingsProfileWorkspaceActionsMenu } from './SettingsProfileWorkspaceActionsMenu';

export function SettingsProfileWorkspaceTopToolbar(): React.ReactNode {
  const { back } = useWebRouter();

  return (
    <>
      <BackIconButton onClick={back} />
      <Box>
        <Fab
          color="primary"
          size="small"
          component={WebLink}
          href={
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
}
