import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { MuiFaIcon } from '@js-modules/web-react-utils';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { Link, useParams } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';

export const LogLogEntryWorkspaceTopToolbar: React.FC = () => {
  const { logEntryId } = useParams();

  const routeMetadataEdit = useMemo(
    () =>
      routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
        WebSubModulesLog.logEntry
      ].subRoutes![WebSubModulesLogLogEntry.edit],
    [],
  );

  const routeMetadataEditPath = useMemo(
    () => routeMetadataEdit.path.replace('/logEntryId/', `/${logEntryId}/`),
    [logEntryId, routeMetadataEdit.path],
  );

  const routeMetadataLog = useMemo(
    () => routesMetadataPrivate[WebModulesPrivate.log],
    [],
  );

  return (
    <>
      <Box>
        <Button
          color="secondary"
          size="small"
          component={Link}
          to={routeMetadataLog.path}
          startIcon={<MuiFaIcon icon={faAngleLeft} />}
          endIcon={<MuiFaIcon icon={routeMetadataLog.icon} />}
        >
          {routeMetadataLog.label}
        </Button>
      </Box>
      <Box />
      <Box>
        <Fab
          title={routeMetadataEdit.label}
          color="primary"
          size="small"
          component={Link}
          to={routeMetadataEditPath}
        >
          <MuiFaIcon icon={faPenToSquare} />
        </Fab>
      </Box>
    </>
  );
};
