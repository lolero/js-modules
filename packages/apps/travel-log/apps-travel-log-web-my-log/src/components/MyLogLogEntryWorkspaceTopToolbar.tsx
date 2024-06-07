import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { MuiFaIcon } from '@js-modules/web-react-components';
import {
  modulesPrivateRoutesMetadata,
  WebModulesPrivate,
  WebSubModulesMyLog,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { Link, useParams } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';

export const MyLogLogEntryWorkspaceTopToolbar: React.FC = () => {
  const { logEntryId } = useParams();

  const routeMetadataEdit = useMemo(
    () =>
      modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].subRoutes![
        WebSubModulesMyLog.logEntry
      ].subRoutes![WebSubModulesMyLogLogEntry.edit],
    [],
  );

  const routeMetadataEditPath = useMemo(
    () => routeMetadataEdit.path.replace('/logEntryId/', `/${logEntryId}/`),
    [logEntryId, routeMetadataEdit.path],
  );

  const routeMetadataMyLog = useMemo(
    () => modulesPrivateRoutesMetadata[WebModulesPrivate.myLog],
    [],
  );

  return (
    <>
      <Box>
        <Button
          color="secondary"
          size="small"
          component={Link}
          to={routeMetadataMyLog.path}
          startIcon={<MuiFaIcon icon={faAngleLeft} />}
          endIcon={<MuiFaIcon icon={routeMetadataMyLog.icon} />}
        >
          {routeMetadataMyLog.label}
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
