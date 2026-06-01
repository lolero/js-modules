// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function OutlinedAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="success">
        This is an outlined success Alert.
      </Alert>
      <Alert variant="outlined" severity="info">
        This is an outlined info Alert.
      </Alert>
      <Alert variant="outlined" severity="warning">
        This is an outlined warning Alert.
      </Alert>
      <Alert variant="outlined" severity="error">
        This is an outlined error Alert.
      </Alert>
    </Stack>
  );
}
