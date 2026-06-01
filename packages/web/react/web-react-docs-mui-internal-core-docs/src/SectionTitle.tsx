import Typography from '@mui/material/Typography';
import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/SectionTitle` consumed by the
// verbatim MUI docs examples in web-react-docs-mui.
export type SectionTitleProps<THash extends string = string> = {
  title: React.ReactNode;
  hash: THash;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export function SectionTitle<THash extends string = string>({
  title,
  hash,
  level = 'h2',
}: SectionTitleProps<THash>): React.ReactNode {
  return (
    <Typography id={hash} variant={level}>
      {title}
    </Typography>
  );
}
