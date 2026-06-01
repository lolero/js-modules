import Box from '@mui/material/Box';
import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/HighlightedCode` consumed by
// the verbatim MUI docs examples in web-react-docs-mui.
export type HighlightedCodeProps = {
  code: string;
  language?: string;
};

export function HighlightedCode({
  code,
}: HighlightedCodeProps): React.ReactNode {
  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 2,
        overflow: 'auto',
        borderRadius: 1,
        bgcolor: 'action.hover',
        fontFamily: 'monospace',
        fontSize: '0.8125rem',
      }}
    >
      <code>{code}</code>
    </Box>
  );
}
