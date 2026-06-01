// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="fullWidth" id="fullWidth" />
    </Box>
  );
}
