// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function JavaScriptMedia() {
  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  return <span>{`{ minWidth: 600 } matches: ${matches}`}</span>;
}
