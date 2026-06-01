// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function TooltipOffset() {
  return (
    <Tooltip
      describeChild
      title="Add"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      <Button>Offset</Button>
    </Tooltip>
  );
}
