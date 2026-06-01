import { styled } from '@mui/material/styles';
import type { FC, HTMLAttributes } from 'react';

// Shim for the unpublished `@mui/internal-core-docs/MarkdownDocs` consumed by the
// verbatim MUI docs examples in web-react-docs-mui. The explicit annotation keeps
// the emitted type portable (styled()'s inferred type references MUI internals).
export const MarkdownElement: FC<HTMLAttributes<HTMLDivElement>> = styled(
  'div',
)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
}));
