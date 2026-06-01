// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function HelperTextMisaligned() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
      <TextField
        helperText="Please enter your name"
        id="demo-helper-text-misaligned"
        label="Name"
      />
      <TextField id="demo-helper-text-misaligned-no-helper" label="Name" />
    </Box>
  );
}
