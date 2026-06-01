// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import NoSsr from '@mui/material/NoSsr';
import Box from '@mui/material/Box';

export default function SimpleNoSsr() {
  return (
    <div>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Server and Client
      </Box>
      <NoSsr>
        <Box
          sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
        >
          Client only
        </Box>
      </NoSsr>
    </div>
  );
}
