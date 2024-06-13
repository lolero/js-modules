import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {
  useNodeLogEntriesEntity,
  useNodeLogEntriesGetOne,
} from '@js-modules/apps-travel-log-common-store-redux';
import isUndefined from 'lodash/isUndefined';
import CircularProgress from '@mui/material/CircularProgress';

export const MyLogLogEntryWorkspaceContentBox: React.FC = () => {
  const { logEntryId } = useParams();

  const nodeLogEntry = useNodeLogEntriesEntity(logEntryId ?? '');

  const {
    request: nodeLogEntriesGetOneRequest,
    callback: nodeLogEntriesGetOneCallback,
  } = useNodeLogEntriesGetOne();

  useEffect(() => {
    if (isUndefined(nodeLogEntry) && isUndefined(nodeLogEntriesGetOneRequest)) {
      nodeLogEntriesGetOneCallback(logEntryId!);
    }
  }, [
    logEntryId,
    nodeLogEntriesGetOneCallback,
    nodeLogEntriesGetOneRequest,
    nodeLogEntry,
  ]);

  if (isUndefined(nodeLogEntry)) {
    return <CircularProgress size={40} />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Typography>Title:</Typography>
        <Typography>{nodeLogEntry.title}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Typography>Description:</Typography>
        <Typography>{nodeLogEntry.description}</Typography>
      </Box>
    </Box>
  );
};
