// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DelayTooltips() {
  return (
    <Tooltip describeChild title="Add" enterDelay={500} leaveDelay={200}>
      <Button>[500ms, 200ms]</Button>
    </Tooltip>
  );
}
