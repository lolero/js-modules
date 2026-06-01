import Box from '@mui/material/Box';
import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/IconImage` consumed by the
// verbatim MUI docs examples in web-react-docs-mui. The real component serves
// branded SVG assets that don't exist here, so render a sized placeholder.
export type IconImageProps = {
  name: string;
  width?: number | string;
  height?: number | string;
  loading?: 'eager' | 'lazy';
};

export default function IconImage({
  name,
  width = 24,
  height = 24,
}: IconImageProps): React.ReactNode {
  return (
    <Box
      aria-label={name}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1,
        bgcolor: 'action.hover',
      }}
    />
  );
}
