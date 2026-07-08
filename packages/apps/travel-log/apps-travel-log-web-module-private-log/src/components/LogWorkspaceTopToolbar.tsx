import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import type React from 'react';
import { useMemo } from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { WebLink } from '@js-modules/web-react-router';
import { LogPagination } from './LogPagination';
import { LogWorkspaceActionsMenu } from './LogWorkspaceActionsMenu';

export const LogWorkspaceTopToolbar: React.FC = () => {
  const routeMetadata = useMemo(
    () =>
      routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
        WebSubModulesLog.logEntry
      ].subRoutes![WebSubModulesLogLogEntry.addNew],
    [],
  );

  return (
    <>
      <Box />
      <Box>
        <LogPagination />
        <Fab
          title={routeMetadata.label}
          color="primary"
          size="small"
          component={WebLink}
          href={routeMetadata.path}
        >
          <MuiFaIcon icon={faPlus} />
        </Fab>
        <LogWorkspaceActionsMenu />
      </Box>
    </>
  );
};
