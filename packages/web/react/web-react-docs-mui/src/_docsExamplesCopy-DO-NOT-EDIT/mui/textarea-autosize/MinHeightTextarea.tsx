// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
}
