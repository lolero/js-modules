// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import useMediaQuery from '@mui/material/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
