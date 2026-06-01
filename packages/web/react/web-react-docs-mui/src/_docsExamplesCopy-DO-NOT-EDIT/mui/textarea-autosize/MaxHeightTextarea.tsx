// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MaxHeightTextarea() {
  return (
    <TextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
      style={{ width: 200 }}
    />
  );
}
