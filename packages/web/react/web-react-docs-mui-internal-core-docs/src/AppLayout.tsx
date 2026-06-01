import Box from '@mui/material/Box';
import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/AppLayout` consumed by the
// verbatim MUI docs examples in web-react-docs-mui. The real layout adds the docs
// chrome (nav, table of contents, ads); the showcase renders the content alone.
export type AppLayoutDocsProps = {
  title?: string;
  description?: string;
  location?: string;
  toc?: unknown[];
  disableToc?: boolean;
  disableAd?: boolean;
  children?: React.ReactNode;
};

export function AppLayoutDocs({
  children,
}: AppLayoutDocsProps): React.ReactNode {
  return <Box sx={{ p: 3 }}>{children}</Box>;
}
