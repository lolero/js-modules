import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import type React from 'react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { MuiFaIcon } from '@js-modules/web-react-mui';

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
