import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { useWebParams, WebLink } from '@js-modules/web-react-router';

const routeMetadataEdit =
  routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
    WebSubModulesLog.logEntry
  ].subRoutes![WebSubModulesLogLogEntry.edit];

export function LogLogEntryWorkspaceTopToolbar(): React.ReactNode {
  const { logEntryId } = useWebParams();

  const routeMetadataEditPath = routeMetadataEdit.path.replace(
    '/logEntryId/',
    `/${logEntryId}/`,
  );

  const routeMetadataLog = routesMetadataPrivate[WebModulesPrivate.log];

  return (
    <>
      <Box>
        <Button
          color="secondary"
          size="small"
          component={WebLink}
          href={routeMetadataLog.path}
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
          component={WebLink}
          href={routeMetadataEditPath}
        >
          <MuiFaIcon icon={faPenToSquare} />
        </Fab>
      </Box>
    </>
  );
}
