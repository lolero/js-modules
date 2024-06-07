import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { Link } from 'react-router-dom';
import {
  modulesPrivateRoutesMetadata,
  WebModulesPrivate,
  WebSubModulesMyLog,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';

export const MyLogWorkspaceTopToolbar: React.FC = () => {
  const routeMetadata = useMemo(
    () =>
      modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].subRoutes![
        WebSubModulesMyLog.logEntry
      ].subRoutes![WebSubModulesMyLogLogEntry.addNew],
    [],
  );

  return (
    <>
      <Box />
      <Box>
        <Fab
          title={routeMetadata.label}
          color="primary"
          size="small"
          component={Link}
          to={routeMetadata.path}
        >
          <MuiFaIcon icon={faPlus} />
        </Fab>
      </Box>
    </>
  );
};
