// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function DisableElevation() {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled button group"
    >
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  );
}
