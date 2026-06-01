// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearColor() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" aria-label="Loading…" />
      <LinearProgress color="success" aria-label="Loading…" />
      <LinearProgress color="inherit" aria-label="Loading…" />
    </Stack>
  );
}
