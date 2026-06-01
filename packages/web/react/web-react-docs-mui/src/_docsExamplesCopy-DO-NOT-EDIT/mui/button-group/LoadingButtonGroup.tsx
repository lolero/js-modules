// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export default function LoadingButtonGroup() {
  return (
    <ButtonGroup variant="outlined" aria-label="Loading button group">
      <Button>Submit</Button>
      <Button>Fetch data</Button>
      <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
        Save
      </Button>
    </ButtonGroup>
  );
}
