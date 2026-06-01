// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      slotProps={{
        input: { 'aria-label': 'controlled' },
      }}
    />
  );
}
