// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
    </Stack>
  );
}
