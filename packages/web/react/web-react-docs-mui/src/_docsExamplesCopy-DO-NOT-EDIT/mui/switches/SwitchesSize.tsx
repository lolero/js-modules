// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Switch from '@mui/material/Switch';

const label = { slotProps: { input: { 'aria-label': 'Size switch demo' } } };

export default function SwitchesSize() {
  return (
    <div>
      <Switch {...label} defaultChecked size="small" />
      <Switch {...label} defaultChecked />
    </div>
  );
}
