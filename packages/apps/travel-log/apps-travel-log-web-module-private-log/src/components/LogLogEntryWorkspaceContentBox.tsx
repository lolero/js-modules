import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import isUndefined from 'lodash/isUndefined';
import type React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useNodeLogEntriesEntity,
  useNodeLogEntriesGetOne,
} from '@js-modules/apps-travel-log-common-store-redux';

export const LogLogEntryWorkspaceContentBox: React.FC = () => {
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
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Typography>Created at:</Typography>
        <Typography>{nodeLogEntry.createdAt}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Typography>Updated at:</Typography>
        <Typography>{nodeLogEntry.updatedAt}</Typography>
      </Box>
    </Box>
  );
};
