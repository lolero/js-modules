// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips() {
  return (
    <Tooltip describeChild title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
  );
}
