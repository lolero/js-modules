import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/branding` consumed by the
// verbatim MUI docs examples in web-react-docs-mui. The real provider applies
// MUI's marketing theme; the showcase just inherits the app theme, so this is a
// passthrough.
export type BrandingProviderProps = {
  mode?: 'light' | 'dark';
  children?: React.ReactNode;
};

export function BrandingProvider({
  children,
}: BrandingProviderProps): React.ReactNode {
  return children;
}
