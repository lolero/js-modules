import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { MuiFaIcon } from '@js-modules/web-react-utils';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { Link } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { LogWorkspaceActionsMenu } from './LogWorkspaceActionsMenu';
import { LogPagination } from './LogPagination';

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
          component={Link}
          to={routeMetadata.path}
        >
          <MuiFaIcon icon={faPlus} />
        </Fab>
        <LogWorkspaceActionsMenu />
      </Box>
    </>
  );
};
